"""Validate generated internal links, local assets, anchors, and release metadata."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import sys,json
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.links=[];self.ids=set();self.feed(text)
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if attrs.get('id'): self.ids.add(attrs['id'])
  if tag=='a' and attrs.get('name'): self.ids.add(attrs['name'])
  for name in ('href','src','poster'):
   if attrs.get(name): self.links.append(attrs[name])
  if attrs.get('srcset'): self.links.extend(x.strip().split()[0] for x in attrs['srcset'].split(','))
root=Path(sys.argv[1] if len(sys.argv)>1 else '_site').resolve()
pages={p:Page(p.read_text()) for p in root.rglob('*.html')}
errors=[];count=0
for file,page in pages.items():
 source='/'+str(file.relative_to(root));source=source[:-10] if source.endswith('index.html') else source
 for raw in page.links:
  u=urlsplit(urljoin('https://johnapaz.com'+source,raw))
  if u.scheme not in ('http','https') or u.netloc not in ('johnapaz.com','www.johnapaz.com','staging.johnapaz.com'): continue
  count+=1
  target=root/unquote(u.path).lstrip('/')
  options=[target,target/'index.html',Path(str(target)+'.html')]
  dest=next((p for p in options if p.is_file()),None)
  if not dest: errors.append(f'{source}: missing {raw}');continue
  if u.fragment and dest in pages and unquote(u.fragment) not in pages[dest].ids: errors.append(f'{source}: missing anchor {raw}')
for path in ('index.html','blog/index.html','writing/index.html','blog/website-v2-launch/index.html'):
 html=(root/path).read_text()
 if '/blog/website-v2-launch/' not in html and path!='blog/website-v2-launch/index.html': errors.append(f'{path}: launch link missing')
 if 'https://johnapaz.com//' in html: errors.append(f'{path}: malformed production URL')
article=(root/'blog/website-v2-launch/index.html').read_text()
if 'application/ld+json' not in article or 'Substantial drafting' not in article: errors.append('Launch metadata/disclosure missing')
if errors:
 print('\n'.join(errors));sys.exit(1)
print(f'Passed: {len(pages)} HTML pages; {count} internal links/assets/anchors; launch placement and metadata')
