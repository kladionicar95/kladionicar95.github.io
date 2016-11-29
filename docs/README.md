# Aplikacija IRPanel - Izdelava načrta postavitve panelov

##Opis aplikacije
Izdelal sem spletno aplikacijo, kjer uporabnik vpiše podatke stanovanja(posamezno sobo in kvadraturo) ter program mu na podlagi tega izbere število panelov ter moč teh panelov in mu izdela ponudbo. V končni verziji bo imel na izbiro tudi termostate in v ponudbo vključil tudi te. Poskusil bi tudi izdelati tudi grafičen prikaz idealne postavitve panelov/montaže v posamezni sobi za stropno montažo. Uporabnik bi se registriral v aplikacijo in lahko kasneje z prijavo urejal podatke. Ko pa se prijavi administrator se mu prikažejo vse dane ponudbe ki jih lahko tudi ureja, lahko dostopa do informacij kupcev, ter v primeru da se kupec odloči mu izdela tudi predračun.

##Ciljna publika in naprave
Cilna publika so kupci ki se zanimajo za nakup IR panelov in bi si radi izvedeli informativno koliko bi stala oprema stanovanja. Aplikacija je namenjena za vse naprave - mobilce, tablice ter namizne računalnike.

##Poročilo o delovanju v različnih brskalnikih
Aplikacijo sem testiral v treh različnih brskalnikih: Safari, Chrome ter Firefox. Stran je funkcionalna v vseh treh omenjenih brskalnikih, zaplete sem imel z implementacijo webkamere, ki trenutno deluje le v brskalniku Firefox.

##Posebni gradniki
-"Risalna plošča" na strani za načrtovanje, ki omogoča glede na podano merilo vnos sob, ki jih imamo v stanovanju, ter z klikom na izračun se v prostor postavijo paneli(funkcionalnost izračuna smiselne moči panelov bo izdelana v končni oddaji), stran lahko poljubno resizamo in gradniki bojo obdržali razmerja med njimi

-"Merilo" je izdelano tako, da ga lahko poljubno večamo - tako da ga naravnamo na eno sobo in vpišemo mero in se glede na to izrišejo različno velike sobe. Merilo z pomočjo css gradienta izgleda super.
