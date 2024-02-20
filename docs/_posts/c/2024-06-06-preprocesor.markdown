---
layout: post
title:  "Preprocesor"
date:   2024-06-06 07:00:00 +0200
last_modified_at: 2024-06-06 07:00:00 +0200
category: Programovací jazyk C
read_time: 4 min 4 s
description: Preprocesor jazyka C a jeho direktivy (define, include, if).
permalink: programovaci-jazyk-c/preprocesor
---

[Předchozí [Strings - příklady]]({% post_url c/2023-10-02-strings-priklady %})

Preprocesor v Céčku představuje první část překladu. Jeho činnost začíná před samotnou kompilací a spočívá v nahrazení textů jinými texty (jedná se o tzv. makro procesování). Příkazy pro preprocesor začínají hashtagem (#) a nejsou ukončovány středníkem tak, jak to známe.

## #include

Od úplného počátku pracujeme s příkazem #include. Tento příkaz způsobí, že preprocesor na jeho místě ve zdrojovém kódu dosadí obsah souboru, který pomocí includu udáme.

Typicky se jedná o tzv. header-soubory. Takovéto soubory obsahují deklarace, makra, globální proměnné, konstanty, ... Tzv. standard headers přidáváme ve špičatých závorkách, vlastní header-soubory pak v uvozovkách s udáním cesty k souburu:

{% highlight c %}
// standard header
#include <stdio.h>

// vlastni
#include "../matematika/konstanty.h"
{% endhighlight %}

Vlastní header-soubory procesor hledá vycházejíc z aktuálního souboru.

Čím více header-souborů budeme přidávat, tím déle bude trvat překlad zdrojového kódu.

### Navigace mezi soubory - crashkurs

Pokud víte, jak se pohybovat v terminálu mezi jednotlivými složkami, tak tuhle část můžete přeskočit. Pokud ne, pak si otevřete terminál nebo příkazový řádek. Na Linuxových mašinách toho obvykle dosáhnete klávesovou zkratkou *ctrl+t*, případně přes vyhledávání aplikací nebo pravým tlačítkem myši ve vybrané složce, kde se terminál má otevřít. Na Windowsu příkazový řádek také najdete přes vyhledávání, nebo ho otevřete například tak, že v prohlížeči souborů v řádku s adresou napíšete *cmd* a potvrdíte klávesou Enter.

Představte si, že máte někde uloženou složku s názvem *SL1* a v ní následující strukturu složek:

{% include image.html url="/assets/images/c/slozky.png" description="Složky" %}

Pro pohyb mezi složkami slouží u Windowsu i Linuxu příkaz *cd*, pro zobrazení obsahu pak u Windowsu *dir*, u Linuxu *ls*. Do složky v nižší úrovni se dostanete oddělením názvů složek lomítky (/), do složky výše se dostanete dvěmi tečkami (..).

Otevřete si příkazový řádek ve složce *SL1*.

Pokud byste se chtěli dostat z SL1 do SL2, uděláte to následovně:

{% highlight console %}
cd SL2
{% endhighlight %}

Předpokladem je, že se nacházíte v SL1!

Pokud byste se nyní chtěli dostat zase zpátky do SL1, pak to uděláte tímto příkazem:

{% highlight console %}
cd ..
{% endhighlight %}

Z SL1 do SL7:

{% highlight console %}
cd SL4/SL6/SL7
{% endhighlight %}

Z SL7 do SL3:

{% highlight console %}
cd ../../../SL3
{% endhighlight %}

A právě takto také udáváte cestu k souborům, které chcete přidat přes include. Kdyby se například váš hlavní program nacházel ve složce SL1 a soubor, který chcete přidat, ve složce SL3, pak napíšete:

{% highlight c %}
#include "SL3/matika.h"
{% endhighlight %}

Kdyby váš program byl v SL5 a soubor, který chcete přidat v SL6, pak to bude vypadat takto:

{% highlight c %}
#include "../../SL4/SL6/matika.h"
{% endhighlight %}

Terminál nebo příkazový řádek nabízí také tzv. auto-complete. Pomocí klávesnice tabulátoru vám vyhodí možné názvy souborů nebo složek.

A jako vždy, i tady platí, že nejlepší je si to vyzkoušet.

## #define

Jak už bylo zmíněno na úvodu, preprocesor vlastně nahrazuje text jiným textem. A nemusí se jednat jen o název souboru, který je nahrazen obsahem onoho souboru. Může jít i o nahrazení jednoho slova jiným. K tomu poslouží makro *#define*.

Toto makro můžeme rozdělit na define bez parametrů a define s parametry.

Define bez parametrů je ekvivalentem konstant v Céčku. Syntax vypadá pak tak, že na prvním místě stojí #define, následuje slovo, které budeme chtít v kódu nahrazovat, a na konci je text, kterým slovo nahradíme.

Pár příkladů:

{% highlight c %}
#define PI 3.14159265
#define PI_NA_DRUHOU (PI * PI)
#define PODVAHA 18.5
{% endhighlight %}

Makra s parametry pak mají na druhém místě nejenom název, který budeme nahrazovat, nýbrž i parametry v závorkách. Opět ukázka na příkladu:

{% highlight c %}
#define MAX(x, y) ((x) > (y) ? (x) : -(x))
{% endhighlight %}

Nešetřete závorkami u takových maker! V místě použití nemusí být předáno pouze číslo, nýbrž jiný výraz či operace a celé by se to bez závorek rozhodilo a výsledek by nebyl takový, jaký bysme očekávali (a překladač by to nevyhodnotil jako chybu). Závorky dejte vždy kolem každého parametru a kolem celého výrazu také jeden pár závorek.

### Rozdíl mezi makry a funkcemi

Makra jsou jednoznačně rychlejší. Nejedná se o volání funkce, nekopírují se žádné proměnné a jejich hodnoty. Za to je výsledný zdrojový kód o něco delší, protože se jedná o opakující se kopírování kódu na námi vybraná místa.

Ale funkce mají nespornou výhodu v tom, že kontrolují datové typy a zda se shodují s podpisem funkce.

## Podmíněný překlad

{% highlight c %}
#if podminka
// ...
#ifdef nazev
// ...
#ifndef nazev
// ...
#else
// ...
#endif
{% endhighlight %}

Použitá podmínka nesmí být proměnná, protože musí být možné ji vyhodnotit v době překladu. A jako vždy platí, že je pravdivá, pokud se nerovná nule.

#ifdef pokračuje v kódu, pokud je *nazev* definován. Naopak #ifndef pokračuje v kódu, pokud *nazev* definován není.

Všechny tyto podmínky jsou kontrolovány v průběhu překladu. Také se může stát, že nebude splněna žádná podmínka a nebude tudíž vygenerován žádný kód.

Využití nalezne podmíněný překlad například tehdy, pokud píšeme kód pouze pro určitý operační systém, jen pro určitý cílový hardware, software verze, atd. Při nesplnění nějakého předpokladu není generován kód při překladu. 

Také se takovýmto překladem dá zabránit opakovaného #include-příkazu. Kdybychom například měli soubor "matika.h", pak by jeho obsah při použití podmíněného překladu vypadal následovně:

{% highlight c %}
#ifndef _MATIKA_H_
#define _MATIKA_H_
...
#endif // _MATIKA_H_
{% endhighlight %}

Pokud bysme pak v našem hlavním programu přidali soubor matika.h pomocí include-příkazu, pak by se tak stalo jenom v případě, že by ještě na tom místě přidán nebyl. Tohle je možná těžko představitelná situace v případě 2 souborů, lehko se to však může stát v případě desítek nebo stovek souborů, kde by matika mohla být použita i v jiném, vedlejším souboru a přes něj by následně mohla být opakovaně vložena do hlavního.

## Kam dál?

{% comment %} [Pointer (ukazatel)]({% post_url c/2023-10-09-pointer %}) {% endcomment %}
