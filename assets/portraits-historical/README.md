# Historical leader portraits

An alternative set of the 42 leader portraits of the diplomacy room, one for each tribe's man and woman, made from historical works of art in the public domain (and six generated with AI where no suitable one was found). It is kept here for reference and possible later use. **OpenCiv2 does not load these pictures:** with HD graphics the game draws the art pack's own portraits (`assets/atlas-hd`), which is what was chosen for it. The set was made and tried in OpenCiv2's local staging folder `data/native/hd-extra` before that choice was made; this folder is that set, as it was finally reviewed.

`leader-ID.webp`: the portrait for the original's `mk.dll` picture *ID* (220 + the tribe's slot: a man, 241 + the slot: a woman), 900x1100 WebP, four times the original's 225x275 frame.

All 42: 34 in the public domain and 2 under CC0, from Wikimedia Commons (each licence checked on the file's Commons page) but one from the Internet Archive (the Zulus' man, a plate of 1849), and 6 AI-generated with Google's Gemini 3 Pro Image: Mao (231), where no public-domain picture in colour was found, and, chosen over the public-domain candidates in the last round of review, the Babylonians' man and woman (221, 242), the Egyptians' woman (244), the Zulus' woman (249) and the Vikings' woman (257). Two of the public-domain ones carry a doubt that Commons itself records: 220 (its US status marked unclear) and 239 (a modern photograph uploaded without a source); see their entries.

## How they were made

Each source was cropped to the frame's 225:275 about the face or figure, scaled to 900x1100 (Lanczos; where the source was too small, enlarged: noted), and given the same muted, aged finish so that they sit together in the dim painted rooms: saturation 0.8, a 14% sepia blend (85% for a source in black and white), darkened by a gamma towards a mean grey of 100, levels 14 to 226, contrast 0.95, the corners darkened (a radial vignette to 72%) and a fine grain (Gaussian noise, sigma 18, blurred 0.6); a few faint or bright ones darker or with stronger contrast; then lossy WebP at quality 90 (Pillow, method 6): 0.31 to 0.50 MB each.

The generated ones: Gemini 3 Pro Image (`gemini-3-pro-image`, aspect 4:5, size 2K, 1856x2304), the prompt in each entry below, then the same crop and finish. For the five of the last round (221, 242, 244, 249, 257) two of the art pack's diplomacy-room backgrounds (the Monarchy and Communism rooms) were attached to the prompt as references for tone only; Mao's prompt had no reference image.

"Legendary": the game's leader has no likeness or is a figure of legend, and the picture shows that figure, or one of the same kind, as later artists imagined her or him. "Stand-in": the picture shows another person or figure (named in the entry) in place of the game's leader.

## Summary

| ID | Tribe | Gender | Leader | Source | Note |
|---|---|---|---|---|---|
| [220](#220) | Romans | man | Caesar | public domain (US status unclear on Commons) |  |
| [221](#221) | Babylonians | man | Hammurabi | AI-generated |  |
| [222](#222) | Germans | man | Frederick the Great | public domain | stand-in |
| [223](#223) | Egyptians | man | Ramesses II | public domain | stand-in |
| [224](#224) | Americans | man | Abe Lincoln | public domain |  |
| [225](#225) | Greeks | man | Alexander | public domain |  |
| [226](#226) | Indians | man | Mohandas Gandhi | public domain |  |
| [227](#227) | Russians | man | Lenin | public domain |  |
| [228](#228) | Zulus | man | Shaka | public domain | stand-in |
| [229](#229) | French | man | Louis XIV | CC0 |  |
| [230](#230) | Aztecs | man | Montezuma | public domain |  |
| [231](#231) | Chinese | man | Mao Tse Tung | AI-generated |  |
| [232](#232) | English | man | Henry VIII | public domain |  |
| [233](#233) | Mongols | man | Genghis Khan | public domain | stand-in |
| [234](#234) | Celts | man | Cunobelin | public domain | stand-in |
| [235](#235) | Japanese | man | Tokugawa | public domain |  |
| [236](#236) | Vikings | man | Canute | public domain | stand-in |
| [237](#237) | Spanish | man | Philip II | public domain |  |
| [238](#238) | Persians | man | Xerxes | public domain | stand-in |
| [239](#239) | Carthaginians | man | Hannibal | public domain (photograph's status unknown) | stand-in |
| [240](#240) | Sioux | man | Sitting Bull | public domain |  |
| [241](#241) | Romans | woman | Livia | public domain | stand-in |
| [242](#242) | Babylonians | woman | Ishtari | AI-generated | legendary |
| [243](#243) | Germans | woman | Maria Theresa | public domain |  |
| [244](#244) | Egyptians | woman | Cleopatra | AI-generated |  |
| [245](#245) | Americans | woman | Eleanor Roosevelt | public domain |  |
| [246](#246) | Greeks | woman | Hippolyta | public domain | stand-in |
| [247](#247) | Indians | woman | Indira Gandhi | public domain |  |
| [248](#248) | Russians | woman | Catherine the Great | public domain |  |
| [249](#249) | Zulus | woman | Shakala | AI-generated |  |
| [250](#250) | French | woman | Joan of Arc | public domain |  |
| [251](#251) | Aztecs | woman | Nazca | public domain | stand-in |
| [252](#252) | Chinese | woman | Wu Zhao | public domain |  |
| [253](#253) | English | woman | Elizabeth I | public domain |  |
| [254](#254) | Mongols | woman | Bortei | public domain | stand-in |
| [255](#255) | Celts | woman | Boadicea | CC0 | stand-in |
| [256](#256) | Japanese | woman | Amaterasu | public domain | legendary |
| [257](#257) | Vikings | woman | Gunnhild | AI-generated |  |
| [258](#258) | Spanish | woman | Isabella | public domain |  |
| [259](#259) | Persians | woman | Scheherazade | public domain | legendary |
| [260](#260) | Carthaginians | woman | Dido | public domain | legendary |
| [261](#261) | Sioux | woman | Sacagawea | public domain | stand-in |

## Licences

The 36 pictures made from existing works are made (cropped, scaled, toned) from paintings, mosaics, prints, manuscripts, a stamp, stained glass, vase paintings and photographs in the public domain (34: Wikimedia Commons' PD-Art, PD-old, PD-US, PD-Japan, PD-India and like tags; PD-Art: a faithful photograph of a two-dimensional work in the public domain is itself in the public domain) or under the Creative Commons CC0 1.0 Universal Public Domain Dedication (2: <https://creativecommons.org/publicdomain/zero/1.0/>), each found on [Wikimedia Commons](https://commons.wikimedia.org) and its licence checked on the file's page there, but one: a plate of 1849 (George French Angas, *The Kafirs Illustrated*; the artist d. 1886), from the Natural History Museum, London's scan on the [Internet Archive](https://archive.org). Where a scan's page also offers it under a Creative Commons licence, the public-domain status is what is relied on. No notice is required; each entry below credits the work, its artist, date and source page all the same.

The 6 AI-generated pictures have no source licence; they were made for OpenCiv2 and are under this repository's [LICENSE-media](../../LICENSE-media) (MIT).

## Trying them in OpenCiv2

OpenCiv2 draws pictures of its own from `data/native/hd-extra` in place of the art pack's (its `docs/HD-GRAPHICS.md`, *OpenCiv2's own pictures and heralds*): copy the WebP files there and add a line for each to its `pictures.txt`, `KEY W H FILE`:

```
crop/resource/mk.dll/gifs/220/1,1,225,275 225 275 leader-220.webp
crop/resource/mk.dll/gifs/221/1,1,225,275 225 275 leader-221.webp
...
crop/resource/mk.dll/gifs/261/1,1,225,275 225 275 leader-261.webp
```

That is how they were drawn when they were tried. The game now gives each tribe one of the art pack's portraits by region (`hd_portraits` and `hd_diplomacy_portrait` in `src/game/hd_graphics.cpp`), binding the room's portrait to that portrait's key, so with the lines above most tribes would show another tribe's picture: to see each on its own tribe, `hd_diplomacy_portrait` must leave the portrait's own key in place where `hd-extra` has it.

## The pictures

### 220

`leader-220.webp`: Romans, man: **Caesar**

- Work: Arrivée de Jules César à Genève (Caesar arrives in Geneva), mosaic (detail); Alexandre Cingria (1879-1945), 1944 (Geneva; shown in public 1949).
- Source: <https://commons.wikimedia.org/wiki/File:Caesar_arrives_in_Geneva.jpg>
- Licence: Public domain: PD-old-70 (the artist d. 1945); Commons marks its US status unclear (Unclear-PD-US-old-70).

Julius Caesar himself in mosaic: helmeted and plumed, a red cloak over gold armour, the reins of his white horse in hand, in large irregular tesserae.  Crop 952x1164, no enlarging.

### 221

`leader-221.webp`: Babylonians, man: **Hammurabi**

- Work: Hammurabi enthroned, as a painted limestone relief (generated); Gemini 3 Pro Image, 2026-11-25.
- Licence: none from a source: AI-generated (Gemini 3 Pro Image, `gemini-3-pro-image`, aspect 4:5, size 2K, with two of the art pack's diplomacy rooms as references for tone), made for OpenCiv2: [LICENSE-media](../../LICENSE-media) (MIT).

Hammurabi himself, imagined: seated in profile on a block throne, the rounded royal cap, a long curled beard, one hand raised, in a carved and painted relief panel. Chosen over the public-domain candidates.

Prompt:

> Hammurabi, king of Babylon, shown in profile facing right in the ancient Mesopotamian manner, with a long curled black beard and hair, a tall rounded royal cap with a band, a fringed robe draped over one shoulder, one hand raised in a gesture of address or prayer, seated on a block throne, as a carved and painted limestone low relief panel: crisp chiselled outlines, shallow modelling, traces of the original paint (blue, red, ochre, black) on pale stone, a plain stone border around the panel. The whole figure, or at least from the crown down to below the hands, sits well inside the frame with clear space around it: the head, crown and both hands fully visible, nothing cut off. A single prominent figure, dignified and regal, not cartoonish, not a modern illustration. In colour, but muted, slightly aged and weathered tones (faded lapis blue, ochre, terracotta, dull gold, cream) so it sits in the dim painted rooms of the reference images; the reference images are for tone only, do not copy their architecture. No text, cuneiform, letters, inscriptions or signatures anywhere. Portrait 4:5.

### 222

`leader-222.webp`: Germans, man: **Frederick the Great**

- Work: Otto III enthroned (ruler portrait), Gospels of Otto III, Munich, Bayerische Staatsbibliothek Clm 4453, fol. 24r (detail); Reichenau school illuminator, c. 1000.
- Source: <https://commons.wikimedia.org/wiki/File:Clm_4453_fol_24r_Detail_Herrscherbild.jpg>
- Licence: Public domain: PD-old-70.

Stand-in (Otto III for Frederick the Great): a German emperor crowned and enthroned frontally, sceptre and orb with a cross in his hands, under a canopy with clergy and warriors at his sides, in flat Ottonian colour: almost the original's composition.  Crop 1663x2034, no enlarging.

### 223

`leader-223.webp`: Egyptians, man: **Ramesses II**

- Work: Seti I enthroned, copy of a painting in his tomb (KV17); Henry William Beechey (for Giovanni Battista Belzoni), watercolour, c. 1818 (photograph: The Yorck Project).
- Source: <https://commons.wikimedia.org/wiki/File:Henry_William_Beechey_001.jpg>
- Licence: Public domain: PD-Art (PD-Art-YorckProject), PD-old-100.

Stand-in (Seti I for Ramesses II, his son): the king alone on his throne in the striped nemes and broad collar, holding a sceptre before an offering table, the vulture of Nekhbet spread above, hieroglyphs round him; flat bright colour on a cream ground.  Crop 958x1170 of a 960-px render, no enlarging.

### 224

`leader-224.webp`: Americans, man: **Abe Lincoln**

- Work: Abraham Lincoln O-77 by Gardner, 1863; Alexander Gardner, 1863-11-08.
- Source: <https://commons.wikimedia.org/wiki/File:Abraham_Lincoln_O-77_by_Gardner,_1863.jpg>
- Licence: Public domain: PD-US.

Alexander Gardner's photograph of 8 November 1863.

### 225

`leader-225.webp`: Greeks, man: **Alexander**

- Work: Alexander Mosaic detail of Alexander the Great; Unknown, circa 100 BC.
- Source: <https://commons.wikimedia.org/wiki/File:Alexander_Mosaic_detail_of_Alexander_the_Great.jpg>
- Licence: Public domain: PD-Art.

Alexander Mosaic, House of the Faun, Pompeii, c. 100 BC.

### 226

`leader-226.webp`: Indians, man: **Mohandas Gandhi**

- Work: Portrait Gandhi; Unknown, probably late 1930s.
- Source: <https://commons.wikimedia.org/wiki/File:Portrait_Gandhi.jpg>
- Licence: Public domain: PD-India.

Photograph, probably late 1930s.

### 227

`leader-227.webp`: Russians, man: **Lenin**

- Work: «Ленин умер, но дело его живет» (Lenin is dead, but his cause lives on); Unknown artist (Leningrad ROSTA), 1924.
- Source: <https://commons.wikimedia.org/wiki/File:%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD_%D1%83%D0%BC%D0%B5%D1%80,_%D0%BD%D0%BE_%D0%B4%D0%B5%D0%BB%D0%BE_%D0%B5%D0%B3%D0%BE_%D0%B6%D0%B8%D0%B2%D0%B5%D1%82.jpg>
- Licence: Public domain: PD-Art, PD-old-70.

Poster, Leningrad: Bureau ROSTA, 1924, colour lithograph; Russian State Library scan. Cropped to the painted portrait inside its border; the slogan left out.

### 228

`leader-228.webp`: Zulus, man: **Shaka**

- Work: Utimuni, Nephew of Chaka, plate of The Kafirs Illustrated (scan leaf 0067); George French Angas (1822-1886), hand-coloured lithograph, 1849.
- Source: <https://archive.org/details/kafirsillustrat00anga>
- Licence: Public domain: published 1849, the artist d. 1886 (PD-old); the Natural History Museum, London's scan for the Biodiversity Heritage Library on the Internet Archive.

Stand-in (Utimuni for Shaka): Shaka's own nephew in full war-dance regalia, full length, cowhide shield and spears, feathered headdress, an arm pointing, drawn from life.  Crop 3147x3846 of the 3925x6009 page scan, no enlarging.

### 229

`leader-229.webp`: French, man: **Louis XIV**

- Work: Louis XIV Rigaud Condé Chantilly; Hyacinthe Rigaud, 1701.
- Source: <https://commons.wikimedia.org/wiki/File:Louis_XIV_Rigaud_Cond%C3%A9_Chantilly.jpg>
- Licence: CC0: CC0 1.0.

Hyacinthe Rigaud, 1701 (Musée Condé version).

### 230

`leader-230.webp`: Aztecs, man: **Montezuma**

- Work: Moctezuma II, "the Last Aztec King", Codex Tovar (Historia de la benida de los yndios), folio 16a; Juan de Tovar, watercolour on paper, c. 1585 (John Carter Brown Library; World Digital Library).
- Source: <https://commons.wikimedia.org/wiki/File:Moctezuma_II,_the_Last_Aztec_King_(Reigned_1502%E2%80%9320)_WDL6724.png>
- Licence: Public domain: PD-Art (PD-old-100).

Moctezuma II standing in full regalia, the xiuhuitzolli crown, a quetzal-feather standard and staff, beside his throne; flat codex colour and outlines, as the original's.  Crop 687x839, enlarged 1.31x.

### 231

`leader-231.webp`: Chinese, man: **Mao Tse Tung**

- Work: Mao Zedong (generated); Gemini 3 Pro Image, 2026.
- Licence: none from a source: AI-generated (Gemini 3 Pro Image, gemini-3-pro-image, aspect 4:5, size 2K), made for OpenCiv2: [LICENSE-media](../../LICENSE-media) (MIT).

Mao Zedong around 1950 as a 1950s Chinese socialist-realist oil portrait.

Why generated: Colour photographs of Mao are not public domain in the US (published after 1945, URAA-restored; Commons marks the 1965 colour photograph Not-PD-US-URAA), nor are the posters and painted portraits by named artists.

Prompt:

> A painted portrait of Mao Zedong (Mao Tse-tung) around 1950, as a 1950s Chinese socialist-realist oil painting: three-quarter view, a calm, confident expression, the grey-green Mao suit buttoned to the collar, visible confident brushwork in the academic oil manner of the period, a plain dark warm background with soft light from the left. Head and shoulders to mid-chest, centred, the head in the upper third with clear space above it; nothing important cut off. Painterly and realistic with natural skin tones, a living person (not a statue, bust or relief), not cartoonish or stylised. Muted, slightly aged varnished colours, mid-dark overall like an old museum painting. No text, letters, inscriptions, signatures, frames or borders. Portrait 4:5.

### 232

`leader-232.webp`: English, man: **Henry VIII**

- Work: Hans Holbein, the Younger, Around 1497-1543 - Portrait of Henry VIII of England - Google Art Project; Hans Holbein the Younger, 1537.
- Source: <https://commons.wikimedia.org/wiki/File:Hans_Holbein,_the_Younger,_Around_1497-1543_-_Portrait_of_Henry_VIII_of_England_-_Google_Art_Project.jpg>
- Licence: Public domain: PD-Art, PD-old-100-expired.

Hans Holbein the Younger, 1537 (Thyssen-Bornemisza).

### 233

`leader-233.webp`: Mongols, man: **Genghis Khan**

- Work: Toda Mongke and his Mongol horde, from a Chingiznama; Tulsi and Madhu (Mughal), 1596 (Los Angeles County Museum of Art).
- Source: <https://commons.wikimedia.org/wiki/File:Toda_Mongke_and_His_Mongol_Horde.jpg>
- Licence: Public domain: PD-Art (PD-old-100).

Stand-in (Toda Mongke, khan of the Golden Horde, for Genghis Khan): a khan riding a black horse at the head of his horde, warriors with lances and maces around him, in clear bright colour; a khan in command rather than in combat.  Crop 1766x2158, reduced.

### 234

`leader-234.webp`: Celts, man: **Cunobelin**

- Work: Christ Enthroned, Book of Kells f. 32v; Insular scribes, Iona/Kells, c. 800.
- Source: <https://commons.wikimedia.org/wiki/File:Book_of_Kells_fol_32v_-_Faksimile_Verlag.jpg>
- Licence: Public domain: PD-Art (PD-old-100).

No likeness of Cunobelin exists: an enthroned, bearded figure of Insular Celtic art (a Christ figure) stands for him.  The whole illumination, to the outer edge of its frame, centred; rotated 0.78° to straighten (with the frame's slight unevenness, up to 0.9°, corrected so that all its sides are upright and level).

### 235

`leader-235.webp`: Japanese, man: **Tokugawa**

- Work: Shogun Tokugawa Ieyasu (Sei-i taishōgun Minamoto no Ieyasu kō), from Mikawa Eiyu Den (Heroes of Mikawa Province); Utagawa Yoshitora, woodblock print, 1873.
- Source: <https://commons.wikimedia.org/wiki/File:Shogun-Tokugawa-Ieyasu.png>
- Licence: Public domain: PD-Art (PD-Japan, PD-old-100-expired).

Ieyasu himself, seated, full figure, in armour with a dragon-crested helmet, white yak-hair mantle and green hakama; one figure, bold flat colour and line.  Crop 806x986, enlarged 1.12x.

### 236

`leader-236.webp`: Vikings, man: **Canute**

- Work: St Olaf, altar frontal from Nidaros Cathedral, Trondheim (detail); Norwegian painter, Trondheim workshop, 14th century (tempera on wood; Archbishop's Palace Museum).
- Source: <https://commons.wikimedia.org/wiki/File:Olaf_Haraldsson_Trondheim.jpg>
- Licence: Public domain: PD-old.

Stand-in (Olaf Haraldsson for Canute): King Olaf of Norway, Cnut the Great's rival (d. 1030), standing full length, crowned, holding his axe and an orb, in flat red and green under a Gothic arch; the frontal's scenes at the sides.  Small source (962x838), so a little soft: crop 576x704, enlarged 1.56x.

### 237

`leader-237.webp`: Spanish, man: **Philip II**

- Work: Titian - King Philip II of Spain - Google Art Project; Titian, between circa 1550 and circa 1551.
- Source: <https://commons.wikimedia.org/wiki/File:Titian_-_King_Philip_II_of_Spain_-_Google_Art_Project.jpg>
- Licence: Public domain: PD-Art, PD-old-auto-expired.

Titian, c. 1550s.  Cropped wide: the crown, the fur, the Golden Fleece's collar and the arms of the chair.

### 238

`leader-238.webp`: Persians, man: **Xerxes**

- Work: Portrait of Fath 'Ali Shah; Mihr 'Ali (Qajar court painter), 1816.
- Source: <https://commons.wikimedia.org/wiki/File:Mihr_%27Ali,_Iran,_1816_-_Portrait_of_Fath_%27Ali_Shah_-_Google_Art_Project.jpg>
- Licence: Public domain: PD-Art, PD-old-100.

Stand-in (Fath 'Ali Shah for Xerxes): no picture of Xerxes in colour exists; a Shah of Persia painted by a Persian court painter, enthroned in his state jewels, the Kayanian crown, armlets and pearl-studded robe, sword across his knees, under an arched top.  Crop 2087x2551, no enlarging.

### 239

`leader-239.webp`: Carthaginians, man: **Hannibal**

- Work: Peltast (Thracian light infantryman) with crescent shield, tondo of an Attic red-figure kylix; unattributed painter, c. 500-450 BC (Harvard Art Museums, Arthur M. Sackler Museum, 1959.219).
- Source: <https://commons.wikimedia.org/wiki/File:Peltast.jpg>
- Licence: tagged PD-US on Commons; doubtful: a modern photograph of a curved cup, uploaded in 2007 with no source, so the photo's status is unknown.

Stand-in: one warrior striding with two spears and a crescent shield painted with a face, in a patterned Thracian cloak and fox-skin cap, inside the meander border.  Crop 1390x1700, reduced.

### 240

`leader-240.webp`: Sioux, man: **Sitting Bull**

- Work: Sitting Bull by DF Barry, 1885; David Francis Barry, 1885.
- Source: <https://commons.wikimedia.org/wiki/File:Sitting_Bull_by_DF_Barry,_1885.jpg>
- Licence: Public domain: PD-US.

David F. Barry's photograph, 1885.

### 241

`leader-241.webp`: Romans, woman: **Livia**

- Work: Empress Theodora and her court, choir mosaic, San Vitale, Ravenna (detail); Master of San Vitale, before 547 (photograph: The Yorck Project).
- Source: <https://commons.wikimedia.org/wiki/File:Meister_von_San_Vitale_in_Ravenna_008.jpg>
- Licence: Public domain: PD-Art (PD-Art-YorckProject).

Stand-in (Theodora for Livia): a Roman (Byzantine) empress in mosaic, crown, halo and pearl pendilia whole; an empress like Livia, though 500 years later, in the original's medium.  Crop 1506x1841, no enlarging.

### 242

`leader-242.webp`: Babylonians, woman: **Ishtari**

- Work: Ishtari in glazed brick, after the Ishtar Gate (generated); Gemini 3 Pro Image, 2026-11-25.
- Licence: none from a source: AI-generated (Gemini 3 Pro Image, `gemini-3-pro-image`, aspect 4:5, size 2K, with two of the art pack's diplomacy rooms as references for tone), made for OpenCiv2: [LICENSE-media](../../LICENSE-media) (MIT).

Legendary. A Babylonian queen and priestess of Ishtar in profile, with a star-topped staff, as a panel of moulded glazed bricks on a blue ground, a border of rosettes. Chosen over the public-domain candidates.

Prompt:

> Ishtari, a Babylonian queen and high priestess of Ishtar, shown in profile facing left in the ancient Mesopotamian manner, with long dark hair in a braided chignon under a jewelled diadem, large earrings, a fringed, patterned robe in tiers, holding a tall staff topped with an eight-pointed star in one hand, the other hand raised in greeting, as a panel of moulded glazed bricks like the Ishtar Gate of Babylon: the figure in raised relief glazed in yellow, cream, white and ochre with dark outlines, on a deep blue glazed-brick ground whose brick joints run across the whole panel, a border of rosettes. The whole figure, or at least from the crown down to below the hands, sits well inside the frame with clear space around it: the head, crown and both hands fully visible, nothing cut off. A single prominent figure, dignified and regal, not cartoonish, not a modern illustration. In colour, but muted, slightly aged and weathered tones (faded lapis blue, ochre, terracotta, dull gold, cream) so it sits in the dim painted rooms of the reference images; the reference images are for tone only, do not copy their architecture. No text, cuneiform, letters, inscriptions or signatures anywhere. Portrait 4:5.

### 243

`leader-243.webp`: Germans, woman: **Maria Theresa**

- Work: Workshop of Meytens - Maria Theresa of Austria2; Workshop of Martin van Meytens, 18th century.
- Source: <https://commons.wikimedia.org/wiki/File:Workshop_of_Meytens_-_Maria_Theresa_of_Austria2.png>
- Licence: Public domain: PD-Art, PD-old-100-expired.

Workshop of Martin van Meytens, 18th century.

### 244

`leader-244.webp`: Egyptians, woman: **Cleopatra**

- Work: Cleopatra with a sistrum, as a New Kingdom tomb painting (generated); Gemini 3 Pro Image, 2026-11-25.
- Licence: none from a source: AI-generated (Gemini 3 Pro Image, `gemini-3-pro-image`, aspect 4:5, size 2K, with two of the art pack's diplomacy rooms as references for tone), made for OpenCiv2: [LICENSE-media](../../LICENSE-media) (MIT).

Cleopatra herself, imagined in the Egyptian manner: in profile, the vulture headdress with plumes and sun disc, a broad collar and pleated linen gown, a gold sistrum in her hand, flat colour on a pale plaster ground within a painted border. Chosen over the public-domain candidates.

Prompt:

> Cleopatra, queen of Egypt, shown in the traditional Egyptian manner, in profile facing right, slender, wearing a golden vulture headdress topped with tall double plumes and a sun disc, a broad jewelled collar of blue, red and gold, a sheer, finely pleated white linen gown with a long red sash, gold bracelets, holding a gold sistrum in one hand, the other hand raised in offering, standing, as a freshly painted New Kingdom tomb wall painting like those of the tomb of Queen Nefertari: flat bright clean colours (lapis blue, ochre, red, white, gold) with crisp dark outlines on a smooth pale sage-cream plaster ground, a painted border of chevrons and bars in blue, ochre and dark red around the panel. The whole figure, or at least from the crown down to below the hands, sits well inside the frame with clear space around it: the head, crown and both hands fully visible, nothing cut off. A single prominent figure, dignified and regal, not cartoonish, not a modern illustration. In colour; the tones should sit well in the dim painted rooms of the reference images (muted tones are fine); the reference images are for tone only, do not copy their architecture. The work is pristine and intact, as if freshly made: no cracks, flaking, chips, losses, stains, fading, weathering or ageing damage of any kind. No text, no hieroglyphs or inscriptions, no cartouches, no letters, writing or signatures anywhere: plain background. Portrait 4:5.

### 245

`leader-245.webp`: Americans, woman: **Eleanor Roosevelt**

- Work: Eleanor-Roosevelt-WH-Portrait; Douglas Chandor, 1949.
- Source: <https://commons.wikimedia.org/wiki/File:Eleanor-Roosevelt-WH-Portrait.jpg>
- Licence: Public domain: PD-Art.

Douglas Chandor's 1949 painting (no renewed copyright).

### 246

`leader-246.webp`: Greeks, woman: **Hippolyta**

- Work: Minerva of Peace, mosaic, Library of Congress, Thomas Jefferson Building (upper half); Elihu Vedder (1836-1923), 1896 (photograph: Carol M. Highsmith).
- Source: <https://commons.wikimedia.org/wiki/File:Minerva-Vedder-Highsmith-original.jpg>
- Licence: Public domain: PD-old-100 (the artist d. 1923); the photograph PD-Highsmith (placed in the public domain by the photographer).

Stand-in: no public-domain image of Hippolyta reads at portrait size; a Graeco-Roman goddess in a late-19th-century mosaic, the same revival style as the game's medallions, bareheaded (her helmet at her feet), both hands in view.  Crop 1575x1925, no enlarging.

### 247

`leader-247.webp`: Indians, woman: **Indira Gandhi**

- Work: Indira Gandhi, USSR postage stamp, 5 kopecks; USSR Post (Ministry of Communications), 1984.
- Source: <https://commons.wikimedia.org/wiki/File:Indira_Gandhi_(on_stamp).jpg>
- Licence: Public domain: PD-RU-exempt (stamps).

Her head and shoulders printed in sepia brown, a flat scan of the stamp's image (no perforations); a tonal print close to the original's sepia portrait.  Crop 666x814, enlarged 1.35x.

### 248

`leader-248.webp`: Russians, woman: **Catherine the Great**

- Work: Catherine II, after Alexander Roslin; After Alexander Roslin, c.
- Source: <https://commons.wikimedia.org/wiki/File:Catherine_II_after_Roslin,_Rokotov_(1780s,_Kunsthistorisches_Museum).jpg>
- Licence: Public domain: PD-Art, PD-old-100-expired.

1780.

Oil on canvas, Kunsthistorisches Museum Vienna, GG 7131. Half-figure with diadem, ermine and the St Andrew chain.

### 249

`leader-249.webp`: Zulus, woman: **Shakala**

- Work: Shakala with staff and fly-whisk, as a hand-coloured lithograph (generated); Gemini 3 Pro Image, 2026-11-25.
- Licence: none from a source: AI-generated (Gemini 3 Pro Image, `gemini-3-pro-image`, aspect 4:5, size 2K, with two of the art pack's diplomacy rooms as references for tone), made for OpenCiv2: [LICENSE-media](../../LICENSE-media) (MIT).

A Zulu queen of the 19th century standing full length: a red-ochre isicholo headdress, bead necklaces, a leopard-skin cape, a leather skirt, a carved staff and a beaded fly-whisk, as a 19th-century hand-coloured plate on a sand-coloured ground. Chosen over the public-domain candidates.

Prompt:

> Shakala, a dignified Zulu queen of the nineteenth century, standing tall and facing the viewer, a mature royal woman with a calm, commanding expression, dressed accurately and respectfully in Zulu royal dress: a wide flared isicholo headdress dyed red ochre, many strands of fine glass-bead necklaces and beaded bands in white, red, blue, black and yellow, a leopard-skin cape over her shoulders as a mark of royalty, a pleated leather isidwaba skirt, beaded ankle bands, holding a tall carved wooden staff in one hand and a beaded fly-whisk in the other, as a fine hand-coloured lithograph plate of the nineteenth century, drawn from life with care and dignity: delicate stippled and cross-hatched modelling, soft transparent watercolour washes, a plain pale sand ground with a hint of grassland and hills, a thin ruled border; a fresh, clean, perfectly preserved print. The whole figure, or at least from the crown down to below the hands, sits well inside the frame with clear space around it: the head, crown and both hands fully visible, nothing cut off. A single prominent figure, dignified and regal, not cartoonish, not a modern illustration. In colour; the tones should sit well in the dim painted rooms of the reference images (muted tones are fine); the reference images are for tone only, do not copy their architecture. The work is pristine and intact, as if freshly made: no cracks, flaking, chips, losses, stains, fading, weathering or ageing damage of any kind. No text, letters, writing, symbols or signatures anywhere. Portrait 4:5.

### 250

`leader-250.webp`: French, woman: **Joan of Arc**

- Work: Jeanne d'Arc - Les vies des femmes célèbres; Jean Pichore, 1506.
- Source: <https://commons.wikimedia.org/wiki/File:Jeanne_d%27Arc_-_Les_vies_des_femmes_c%C3%A9l%C3%A8bres.jpg>
- Licence: Public domain: PD-Art, PD-old-100-expired.

Jean Pichore, Les vies des femmes célèbres, 1506.

### 251

`leader-251.webp`: Aztecs, woman: **Nazca**

- Work: Toci and Xochiquetzal, Two Aztec Goddesses (the left figure, Toci), Codex Tovar; Juan de Tovar, watercolour on paper, c. 1585 (John Carter Brown Library; World Digital Library).
- Source: <https://commons.wikimedia.org/wiki/File:Toci_and_Xochiquetzal,_Two_Aztec_Goddesses_WDL6731.png>
- Licence: Public domain: PD-Art (PD-old-100).

Stand-in: Nazca is the game's name for a culture; shown as Toci, an Aztec goddess, standing in a striped huipil and skirt with a quetzal-feather headdress, feathered devices in both raised hands, in flat codex colour: almost the original's composition.  Crop 670x819, enlarged 1.34x.

### 252

`leader-252.webp`: Chinese, woman: **Wu Zhao**

- Work: 則天大聖皇帝像圖; Unknown Qing court painter, Qing dynasty.
- Source: <https://commons.wikimedia.org/wiki/File:%E5%89%87%E5%A4%A9%E5%A4%A7%E8%81%96%E7%9A%87%E5%B8%9D%E5%83%8F%E5%9C%96.jpg>
- Licence: Public domain: PD-Art, PD-old-100.

Qing-dynasty portrait of Empress Wu Zetian.

### 253

`leader-253.webp`: English, woman: **Elizabeth I**

- Work: Queen Elizabeth I ('The Ditchley portrait') by Marcus Gheeraerts the Younger; Marcus Gheeraerts the Younger, 1592.
- Source: <https://commons.wikimedia.org/wiki/File:Queen_Elizabeth_I_(%27The_Ditchley_portrait%27)_by_Marcus_Gheeraerts_the_Younger.jpg>
- Licence: Public domain: PD-Art, PD-old-100-expired.

Marcus Gheeraerts the Younger, the Ditchley portrait, c. 1592.

### 254

`leader-254.webp`: Mongols, woman: **Bortei**

- Work: YuanEmpressAlbumChabi; Yuan court painter (attributed to Araniko), late 13th century.
- Source: <https://commons.wikimedia.org/wiki/File:YuanEmpressAlbumChabi.jpg>
- Licence: Public domain: PD-Art, PD-old-100.

Stand-in (Chabi for Börte): no image of Börte exists; Chabi, Kublai Khan's empress, from the Yuan album of empresses' portraits (National Palace Museum, Taipei), headdress kept whole.

### 255

`leader-255.webp`: Celts, woman: **Boadicea**

- Work: Bertha Regina, Victorian stained-glass window, north side of St Martin's Church, Canterbury (detail); unknown Victorian glazier, 19th century (photograph: Andy Li, 2024).
- Source: <https://commons.wikimedia.org/wiki/File:Stained_glass_on_the_north_side_of_St_Martin,_Canterbury_2024-12-29.jpg>
- Licence: CC0: the photograph CC0 1.0 (the photographer's own work); the 19th-century glass in the public domain by age.

Stand-in (Bertha of Kent for Boadicea): a crowned early queen of Britain (6th century; Frankish-born, not Celtic) standing under a Gothic canopy, blue mantle and yellow gown, in leaded flat colour. Centred on the light (the glass of the left lancet, edge to edge) and on the figure, crown to hem, no stonework at the sides.  Crop 1000x1222 of a 3840-px render of the 6144x8160 photograph, reduced.

### 256

`leader-256.webp`: Japanese, woman: **Amaterasu**

- Work: Amaterasu cave crop; Utagawa Kunisada (Toyokuni III), 1856.
- Source: <https://commons.wikimedia.org/wiki/File:Amaterasu_cave_crop.jpg>
- Licence: Public domain: PD-Art, PD-old-100-expired.

Legendary (the sun goddess). Utagawa Kunisada, 1856, Amaterasu emerging from the cave.

### 257

`leader-257.webp`: Vikings, woman: **Gunnhild**

- Work: Gunnhild on the shore, as an Arts-and-Crafts book plate (generated); Gemini 3 Pro Image, 2026-11-25.
- Licence: none from a source: AI-generated (Gemini 3 Pro Image, `gemini-3-pro-image`, aspect 4:5, size 2K, with two of the art pack's diplomacy rooms as references for tone), made for OpenCiv2: [LICENSE-media](../../LICENSE-media) (MIT).

Gunnhild herself, imagined: a Norse queen standing on a rocky shore with a longship far off, braided red-gold hair under a diadem, a blue gown and a red cloak with oval brooches, as a book illustration of about 1900 within an interlace border. Chosen over the public-domain candidates.

Prompt:

> Gunnhild, a Norse queen of the Viking age, standing and facing the viewer, a calm, proud woman with long braided red-gold hair under a silver diadem, a long deep-blue gown with an embroidered hem, a rust-red cloak fastened by two oval bronze brooches with a string of beads between them, her hands joined before her, standing on a rocky shore with a longship far off, as an Arts-and-Crafts book illustration plate around 1900: flat stylised figure and landscape in soft pastel colours with firm dark outlines, a warm ochre-yellow sky with a large pale sun and stylised clouds, a woven braided interlace border all around in brown and dark blue. The whole figure, or at least from the crown down to below the hands, sits well inside the frame with clear space around it: the head, crown and both hands fully visible, nothing cut off. A single prominent figure, dignified and regal, not cartoonish, not a modern illustration. In colour; the tones should sit well in the dim painted rooms of the reference images (muted tones are fine); the reference images are for tone only, do not copy their architecture. The work is pristine and intact, as if freshly made: no cracks, flaking, chips, losses, stains, fading, weathering or ageing damage of any kind. No text, no runes, letters, inscriptions, writing or signatures anywhere, also none in the border. Portrait 4:5.

### 258

`leader-258.webp`: Spanish, woman: **Isabella**

- Work: Spanish School, 15th century - Queen Isabella I of Spain, Queen of Castille (1451-1504) - RCIN 403445 - Royal Collection; Spanish school, c. 1470-1520.
- Source: <https://commons.wikimedia.org/wiki/File:Spanish_School,_15th_century_-_Queen_Isabella_I_of_Spain,_Queen_of_Castille_(1451-1504)_-_RCIN_403445_-_Royal_Collection.jpg>
- Licence: Public domain: PD-Art, PD-old-100-expired.

Spanish school, c. 1470-1500 (Royal Collection).  Cropped wide, to the book in her hands; the panel is narrower than the frame, so its sides are carried on, blurred and darkened.

### 259

`leader-259.webp`: Persians, woman: **Scheherazade**

- Work: Woman dancing with castanets (zill); unknown painter, Qajar Iran, c. 1840 (oil on canvas).
- Source: <https://commons.wikimedia.org/wiki/File:Woman_dancing_with_castanets_or_zill,_Qajar_Iran,19th_century.jpg>
- Licence: Public domain: PD-Art (PD-old-100).

Legendary: a woman of Scheherazade's world, a Persian court dancer alone, one arm flung up with the castanets, in a striped and pearl-studded jacket and a flaring red skirt, fruit and flowers beside her.  Head to hips (the full figure is too narrow for the frame). Crop 1280x1564 of a 1280-px render, reduced.

### 260

`leader-260.webp`: Carthaginians, woman: **Dido**

- Work: Hera enthroned with sceptre, and Prometheus, tondo of an Attic red-figure kylix from Vulci; Douris, 490-480 BC (Cabinet des Médailles, Paris, 542; photograph: Jastrow, 2006).
- Source: <https://commons.wikimedia.org/wiki/File:Hera_Prometheus_Cdm_Paris_542.jpg>
- Licence: Public domain: PD-self (the photographer's own work, placed in the public domain); the cup c. 490-480 BC.

Legendary. A crowned queen seated on a throne holding a tall sceptre, red figure on black, the meander border at the left: the original's subject and medium.  Crop 1090x1332, no enlarging.

### 261

`leader-261.webp`: Sioux, woman: **Sacagawea**

- Work: Sha-kó-ka, Mint, a Pretty Girl; George Catlin, 1832.
- Source: <https://commons.wikimedia.org/wiki/File:Sha-k%C3%B3-ka,_Mint_SAAM-1985.66.134_1.jpg>
- Licence: Public domain: PD-old-70-expired (Smithsonian American Art Museum, 1985.66.134).

Stand-in (Catlin's Mandan girl): no portrait of Sacagawea exists; a young Mandan woman painted from life where Sacagawea was living when she joined Lewis and Clark (the Mandan and Hidatsa villages), bead necklaces and a quilled hide dress.
