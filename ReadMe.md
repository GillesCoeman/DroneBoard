# DroneBoard

## Inleiding

De module new media wenst de leerlingen in contact te brengen met allerhande nieuwe technologieën. Na enkele weken een handje vol snufjes te mogen testen, werd ons de opdracht gegeven zelf een apparaat te combineren met software, en hieromtrent een les te geven. Na een relatief korte brainstorm en een langer onderzoek, besloten wij een drone te koppelen aan een Wii Balance board. In dit onderzoeksdocument overlopen wij welke stappen werden uitgevoerd, en wat deze met zich meebrachten.

## Wii Balance Board

Het Wii Balance Board is een accessoire uitgebracht door Nintendo voor de gelijknamige console. Het werd standaard meegeleverd met het Wii fit programma. Net zoals de WiiMote biedt het board de mogelijkheid een connectie te leggen met een computer via bluetooth.

Het board bestaat uit 4 druksensoren. Deze kunnen zo je gewicht uitrekenen, en registreren op welke sectie van het board er meest gewicht geplaatst wordt.

### 2.1 Het Board verbinden met de computer

Brian Peek legt in zijn artikel &#39;Managed Library for Nintendo&#39;s Wiimote&#39;1 uit, hoe je een Wii Balance board kan verbinden met je computer via bluetooth. Dit bracht ons tot volgende stappen;

- Stap 1; houdt het knopje onder aan het Wii Board (onder de capsule voor de batterijen) ingedrukt.
- Stap 2; Klik op de Windows-toets, navigeer naar apparaten en ga naar de tab &#39;bluetooth&#39;.
- Voor Wii Boards, zal de optie &#39;Nintendo RVL-WBC-01&#39; verschijnen. Indien hierop wordt geklikt, zal u gevraagd worden een wachtwoord in te geven. Dit mag genegeerd worden.
- Nu zal het balkje onder de naam vervolledigd worden, waarna, indien alles vlot is verlopen, &#39;gekoppeld&#39; zal verschijnen onder het apparaat.

### 2.2 Testen

De software WiiBalanceWalker biedt de mogelijkheid om het Balance board, eens deze geconnecteerd is met de computer, te testen. De software geeft aan waar er meest gewicht geplaatst werd, en hoeveel gewicht er uiteindelijk op het board staat. Met deze software was het ook mogelijk het board verbonden te houden, aangezien dit wel wat problemen veroorzaakte. De connectie met het board werd namelijk steeds verbroken indien er een tijdje geen interactie was.

De software liet niet enkel toe om te verbinden (en verbonden te blijven) met het Wii board, het is ook mogelijk om functies van het board te koppelen aan handelingen.

Zo kan je instellen dat, indien je springt, er een &#39;spatie&#39; commando doorgegeven wordt aan je computer.

### 2.3 Libraries

Na wat onderzoek bleek OSCulator de meest gebruikt, en de gebruiksvriendelijkste library indien je wenst een WiiMote of andere accessoires van de Wii aan te sturen. Het grote nadeel van deze tool is dat deze enkel beschikbaar is voor iOS. Aangezien wij beide in het bezit zijn van een Windows pc, moesten wij dus een andere oplossing vinden.

Na wat onderzoek kwamen wij op GlovePIE, een library die wat minder uitgebreid lijkt dan OSCulator, maar er zou voldoende functionaliteit moeten zijn om deze opdracht tot een goed einde te brengen.

GlovePIE biedt de mogelijkheid om code te typen in het programma, en deze onmiddellijk te laten runnen. Je kan ook code laten genereren met een GUI, maar deze manier van werken was omslachtig. Wij opteerde er dan ook voor om met enkele bestaande scripts te achterhalen hoe best geprogrammeerd werd.

Nog een groot voordeel aan GlovePIE is dat het mogelijk is om de waarden van je variabelen te zien, terwijl de code aan het draaien is. Wij hadden dus de mogelijkheid om tijdens het programmeren te zien welke variabelen waarden terug gaven, en welke.

Later is gebleken dat de drone het best wordt bestuurd met node.js. Om code te kunnen doorsturen van onze GlovePIE naar node.js, heeft GlovePIE de optie &#39;SendOsc&#39;.

Dit zal een bepaalde boodschap en een berekende waarde overbrengen naar een bepaald IP adres.

### 2.4 Coderen

#### 2.4.1 Muis bewegen met Balance board.

Vooraleer we dit kunnen realiseren, moet het board gekalibreerd worden. Het probleem die zich nu voordoet is dat het board maar goed gekalibreerd kan zijn, eenmaal iemand zich op het board bevindt. Via een kleine test was het mogelijk af te lijden dat &#39;if keyboard.Enter&#39; er voor zorgt dat het volgende in de &#39;if&#39;-lus zal uitgevoerd worden indien de &#39;Enter&#39; toets wordt ingedrukt.

Met bovenstaande code zullen alle waardes weer op 0 gezet worden indien er op het board gestaan wordt. Waarna een waarde tussen 0 en 2 wordt teruggeven, waaruit wij kunnen afleiden hoe hard er gedrukt wordt.

Oorspronkelijk werd er gewerkt met waardes tussen -1 en 1. Maar aangezien er bit waarden worden doorgestuurd, kregen wij een gigantisch getal door in plaats van een negatief kommagetal.

Volgende code zal controleren of er vooruit of achteruit gegaan wordt. Indien Linksboven en Rechtsboven groter zijn dan Links en rechts onder, dan zal de Y waarde gelijk zijn aan alle waardes die van voor geregistreerd werden, gedeeld door 2. Zo kunnen we weten hoeveel de drone naar voor moet vliegen. Hier wordt dus de y waarde van het board geregistreerd.

Indien we de bekomen &#39;y&#39; waarde gelijk stellen met de cursor positie, dan kunnen we zo de cursor besturen aan de hand van het Balance board.

#### 2.4.2 Waardes doorsturen naar NodeJS

Zoals eerder vermeld is het mogelijk om naar een bepaald IP adres waardes door te sturen m.b.v. GlovePIE. Indien wij dus waardes doorsturen naar &#39;127.0.0.1&#39; sturen we naar ons zelf gegevens door. Deze gegevens kunnen hierna in node.js opgevangen worden en verwerkt voor het aansturen van de drone.

Met een kort stuk code zullen we controleren indien er op het Balance board gestaan wordt. Hierin wordt geredeneerd dat, indien de waarde van W groter is dan 40, er op het bord gestaan wordt.

W is een waarde die eerder werd uitgerekend, deze staat voor het gewicht van de persoon die zich op het board bevindt.

Met behulp van onderstaande code sturen wij een &#39;true&#39; of &#39;false&#39; signaal door naar onze node.js 

## A.R. Drone

We kozen ervoor om de AR.Drone van Parrot Inc. als drone om dit project op te baseren. De AR.Drone is een veelgebruikte drone, waardoor er later ook veel mogelijkheden zijn om verder uit te breiden. Daarnaast kunnen we de AR.Drone 2.0 van school gebruiken en een AR.Drone 1.0 van Gilles tijdens de ontwikkeling van het project.

### 3.1 Eerste kennismaking met de drone

We gebruiken de AR.Drone van de opleiding om een eerste test vlucht te maken aan de hand van de Android app AR.FreeFlight 2.4.10 van Parrot SA.

Tijdens deze initiële kenninsmakingsfase leren we de reactiesnelheid van de drone en hebben we meer inzicht over hoe de drone reageert. We weten intussen ook al dat de drone kan aangesproken worden via Wifi.

### 3.2 Het drone verbinden met de computer

Intussen hebben we de drone al verbonden met een Android smartphone, maar voor dit project zullen we de drone moeten verbinden met een Windows laptop. Dit is gelukkig niet moeilijk. Eenmaal je de elektrische kring op de drone sluit door de batterij aan te sluiten, zal de drone zelf een wifi netwerk creëren waarmee de computer kan verbinden.

### 3.3 Libraries

#### 3.3.1 ar-drone

De volgende stap is de drone besturen met de laptop. Hiervoor gebruiken we NodeJS en een library genaamd ar-drone. De bibliotheek gemaakt door Felix Geisendörfer, bied meer dan voldoende mogelijkheden om de drone te besturen en ons project mee te vervolledigen.

We testen de bibliotheek met het volgende script, dat we opstarten vanuit Windows Command Promt via de instructie &quot;node test.js&quot;:

var arDrone =require(&#39;ar-drone&#39;);

var client  = arDrone.createClient();

client.createRepl();

Hiermee krijgen we een venster waarin we de commando&#39;s live kunnen uittesten, zonder ze vooraf te moeten schrijven in een file. Enkele voorbeelden van commando&#39;s zijn:

takeoff()

clockwise(0.5)

land()

Door die simpele commando&#39;s te testen zullen we de drone respectievelijk laten opstijgen, roteren en landen. Daarnaast gebruiken we nog enkele commando&#39;s die hieronder extra uitgelegd worden:

**client.createREPL()**

Hiermee lanceren we een interactieve interface, gelijkend op command prompt om de drone live te besturen.

**client.takeoff()**

Deze code zal de drone laten opstijgen

**client.land()**

Deze code zal de drone laten landen ter plaatse.

**client.up(**snelheid**) / client.down(**snelheid**)**

Hiermee kan je je de hoogte van de drone regelen, de snelheid kan wijzigen 0 en 1

**client.clockwise(**snelheid**) / client.counterClockwise(**snelheid**)**

Hiermee zal de drone ter plaatse roteren, de snelheid kan wijzigen tussen 0 en 1.

**client.front(**snelheid**) / client.back(**snelheid**)**

Dit zal de drone naar voren of achteren laten gaan. De snelheid kan wijzigen tussen 0 en 1.

**client.left(**snelheid**) / client.right(**snelheid**)**

Dit zorgt ervoor dat de drone naar links of rechts zal gaan. De snelheid kan wijzigen tussen 0 en 1.

**client.stop()**

Dit zorgt ervoor dat alle acties op nul worden gezet, hierdoor zal de drone ter plaatse blijven _hoveren_.

#### 3.3.2 node-osc

We zullen ook de OSC boodschappen die ons GlovePIE script uitstuurt moeten opvangen om aan de hand van de input van het Balance board de drone te kunnen besturen. We zullen daarvoor een bibliotheek gebruiken die &quot;node-osc&quot; noemt en gemaakt is door Myles Borins.

Deze bibliotheek stelt ons in staat van OSC boodschappen op te vangen en te bekijken als arrays. Onderstaande code zal dan ook een array genereren en msg noemen. Die wij dan kunnen uitlezen om de boodschappen van elkaar te onderscheiden.

var oscServer = new osc.Server(3333, &#39;0.0.0.0&#39;);

oscServer.on(&quot;message&quot;, function (msg, rinfo) { });

Deze bibliotheek kan ook OSC berichten versturen, maar dat heeft geen relevantie voor ons project.

### 3.4 Coderen

De code die de drone bedient is, dankzij de bibliotheek, zeer kort. Hieronder zal ik een deel code uitleggen in blokken:

We starten de met het importeren van de twee bibliotheken

var osc =require(&#39;C:/Program Files/nodejs/node\_modules/node-osc&#39;);

var arDrone =require(&#39;C:/Program Files/nodejs/node\_modules/ar-drone&#39;);

We zorgen ervoor dat we de AR. Drone kunnen aanspreken in onze code

var client =arDrone.createClient()

We maken de OSC server aan.

var oscServer =newosc.Server(3333, &#39;0.0.0.0&#39;);

We creëren onze globale variabelen. De eerste rij zal gevuld worden met waarden die we krijgen via OSC boodschappen. De tweede rij zal gebruikt worden om te controleren welke waarden veranderd zijn in de stroom van informatie. De speed variabele zal gebruikt worden om de drone rapper of trager te laten reageren.

var fly =false, yaxes =0, xaxes =0, jump =false;

var oFly =false, oYaxes =0, oXaxes =0, oJump =false;

var speed =0.2; // Getal tussen 0 en 1

We gebruiken de node-osc om de controleren of we nieuwe boodschappen binnen krijgen.

oscServer.on(&quot;message&quot;, function (msg, rinfo) {

We controleren het ID van de boodschap, zodat we de data juist kunnen interpreteren, waarna we zullen invoegen in de vooraf gemaakte variabelen.

if (msg[0] ==&#39;/fly&#39;)

We controleren of de waarde veranderd is. Waarden die gelijk gebleven zijn veranderen niets aan de snelheid en richting, maar we elimineren onnodige communicatie met drone.

if (fly != oFly) {

We controleren welke waarde we binnengekregen hebben en geven de correcte instructies aan de drone.

if (fly ==&#39;true&#39;)

client.takeoff();

Niet alle code staat hierboven beschreven omdat ze ofwel voor-de-hand liggend is, ofwel herhaling is van hierboven beschreven code.







# Problemen en oplossingen

## Verbinding met het Balance board

Tijdens het project deden heel wat problemen zich voor. Het grootste, en het terugkeerde probleem was de connectie leggen met het Balance board. Een van onze computers wilde niet verbinden met het board, de andere occasioneel. Het probleem was dat het Balance board maar voor even gekoppeld bleef met de computer, na een tijdje, als de &#39;sync&#39; knop niet meer ingedrukt werd, verdween de connectie. In het begin loste wij dit op door zo snel mogelijk te verbinden met de WiiBalanceWalker. Maar na ons onderzoek hadden wij GlovePIE nodig. En dan was het eigenlijk op goed geluk de pc verbinden met het board, en hopen dat deze lang genoeg verbonden bleef om de code te runnen. Want eenmaal deze gestart was, bleef het board verbonden.

Om dit op te lossen werd de BlueSoleil2 software geïnstalleerd. Deze software zou de mogelijkheid bieden om op een eenvoudige manier uw verbonden bluetooth apparaten te beheren. Wij hebben deze software uitgeprobeerd, maar zonder enig merkbaar verschil. Wij opteerde er dan ook voor om deze links te laten liggen.

Het vreemde aan dit probleem is, dat, wij ook geprobeerd hebben om een WiiMote aan de GlovePIE te verbinden. De Mote kon verbinding maken met de computer, en deze bleef dan ook steeds verbonden.

## Gebruik van GlovePIE en Node.JS

Oorspronkelijk opteerde wij voor het gebruik van processing. Maar al snel bleek dat dit niet mogelijk zou zijn. Aangezien processing de functies van het Balance board niet kent, zou het zeer moeilijk worden om het board aan te spreken hiermee. De vraag werd dan ook snel gesteld of het mogelijk zou zijn om de drone, en het Balance board te koppelen in processing. Gelukkig is GlovePIE voorzien van een methode om gegevens door te sturen.

Na wat research naar de Drone bleek dat Node.JS het meest gebruikt werd, aangezien deze zijn eigen ar-drone module bezit. Na nog wat meer research bleek dat dit de meest logische manier van werken zou zijn.

## Nummers doorzenden met het Balance board

Als test werd gepoogd om een int door te sturen van de GlovePIE naar opdrachtprompt. Tot onze verbazing werd niet het doorgegeven nummer 200 ontvangen. Wij kwamen tot de constatatie dat GlovePIE bits doorstuurde, en dus geen hoger int getal dan 127 kan verzenden. Later gaf dit nog een klein probleem aangezien wij met onze code er voor zorgende dat er een waarde tussen -1 en 1 wordt verstuurd. Tot onze verbazing kregen wij wel waardes tussen 0 en 1, maar die tot -1 werden gigantische getallen. Ook hier bleek het rekenen met bits de struikelblok. Maar door een simpele aanpassing (+1 naar +2 veranderen) kon dit worden opgelost.

## Kalibreren van het Wii Balance Board

Om een correcte waarde naar de drone door te sturen, moet het board gekalibreerd worden. Hier hadden wij even een probleem met GlovePIE. Wij wilde er voor zorgen dat, indien de &#39;enter&#39; toets werd ingedrukt, alles gekalibreerd werd. Het probleem dat wij hiermee ervaarden was dat de &#39;if&#39;-lus niet correct werd uitgevoerd. Na wat research en het uittesten in een ander programma hebben wij uiteindelijk onze code wat herschreven, om dan toch tot een goed resultaat te komen. GlovePIE heeft namelijk een functie &#39;Keyboard&#39;, waarna een bepaalde toets die moet worden aangeslagen kan meegegeven worden.

## Besluit

Na heel wat uren aan dit project te spenderen, geeft het ons uiteindelijk een dubbel gevoel. Wij zijn blij met wat wij verwezenlijkt hebben. Maar door de slechte koppeling a.d.h.v. Bluetooth, heeft het project een onafgewerkt gevoel. Wij hebben veel bijgeleerd op vlak van code schrijven, en de mogelijke combinatie van hardware. Het was leerrijk om deze twee te koppelen, en we hebben van dicht bij ervaren welke moeilijkheden dit allemaal met zich meedraagt.

Ook hebben we ervaren hoe belangrijk het is om gaandeweg een onderzoeksdocument bij te houden. Het document biedt iets om op terug te vallen indien voorgaande pogingen mislukte.

Het project was vallen en op staan, wij zijn blij met wat wij verwezenlijkt hebben, maar hadden graag nog meer gedaan.

## Bronmateriaal

### Artikels, ReadMe&#39;s en Data

#### GlovePIE - Wii Fit Balance Board

The Wii Fit (or Wii Fitness) Balance Board is a new Wii controller that you stand on. It has four weight/pressure sensors, one in each corner.

Balance Boards support is working now, although I haven&#39;t implemented any gesture recognition like walking, jumping, crouching, etc. yet.

The Balance Board  behaves like an extra dummy WiiMote with a Balance Board attachment plugged in. The dummy Wiimote&#39;s LED1 controls the power LED on the top of the board, and the dummy Wiimote&#39;s A button is actually the power button on the Balance Board. The other things on the dummy Wiimote do nothing, except the built-in balance board &quot;attachment&quot;.

The Balance Board is now in a separate category from Wii Remotes, so you can read from the first Balance Board with &quot;BalanceBoard1&quot;.

You can read your total weight like this:

- Weight

You can read the weights on the four sensors (in kilograms) like this:

- FrontLeft, FrontRight
- BackLeft, BackRight

You can also read the weights on each side like this:

- WeightFront, WeightBack,
- WeightLeft, WeightRight

You can read the raw values of the four sensors like this:

- BalanceBoard.RawFrontLeft
- BalanceBoard.RawFrontRight
- BalanceBoard.RawBackLeft
- BalanceBoard.RawBackRight

Unlike the previous version, the sensors now have the correct names. The back is the side with the power button.

Different sensors vary quite a bit.

There are some unknown values you can try:

- BalanceBoard.EE
- BalanceBoard.QuestionQuestion

You can set the LED like this:

- eg. BalanceBoard.LED = true

You can read the button like this:

- BalanceBoard.Button

# Links

SK3TCH - Balance Board Controlled Etch-A-Sketch        [http://glls.be/1QrlalE](http://glls.be/1QrlalE)

Control your Parrot AR Drone with Oculus Rift        [http://glls.be/1QrmyVn](http://glls.be/1QrmyVn)

Wii Balance Walker V4        [http://glls.be/1SiVKWR](http://glls.be/1SiVKWR)

AR Drone For P5        [http://glls.be/1SiVM12](http://glls.be/1SiVM12)

Processing library for AR Drone        [http://glls.be/1SiVNlz](http://glls.be/1SiVNlz)

Autonomous AR Parrot Drone 2        [http://glls.be/1LJdcVp](http://glls.be/1LJdcVp)

Autonomous AR Parrot Drone 2.0 Flying        [http://glls.be/20ZzFQP](http://glls.be/20ZzFQP)

Hacking with OSC and the Wiimote         [http://glls.be/1Qp6leR](http://glls.be/1Qp6leR)

WiiGoogleEarth         [http://glls.be/1Qp6HlJ](http://glls.be/1Qp6HlJ)

Managed Library for Nintendo&#39;s Wiimote        [http://glls.be/1VSG15A](http://glls.be/1VSG15A)

BlueSoleil        [http://glls.be/1VSG3KH](http://glls.be/1VSG3KH)

Github felixge/node-ar-drone        [http://glls.be/1VSDaJF](http://glls.be/1VSDaJF)

Github TheAlphaNerd/node-osc        [http://glls.be/1VSDkkr](http://glls.be/1VSDkkr)


