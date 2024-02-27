---
layout: post
title:  "Smyčky a podmínky v C"
date:   2024-04-04 07:00:00 +0200
last_modified_at: 2024-04-04 07:00:00 +0200
category: Programovací jazyk C
read_time: 14 min 17 s
description: Dnešní díl vám představí smyčky a podmínky, větvení v C. Ukážeme si if a if-else struktury, while, do-while a for smyčky.
excerpt: Dnešní díl vám představí smyčky a podmínky, větvení v C. Ukážeme si if a if-else struktury, while, do-while a for smyčky.
permalink: programovaci-jazyk-c/smycky-a-podminky
---

[Předchozí [Opakování - datové typy, operátory, ASCII]]({% post_url c/2024-03-28-opakovani-datove-typy-operatory-ascii %})

Smyčky a podmínky nebo větvení patří v programování mezi tzv. řídící struktury, v AJ control flow statements. Nabízí nám možnost alternativních či opakujících se cest v rámci našeho programu.

## Podmínky

Větvení programu můžeme docílit za pomocí tzv. if podmínek. V takové if podmínce neděláme nic jiného, než že klademe ano/ne otázky a podle toho se rozhodujeme, kam náš program bude dále pokračovat.

{% include image.html url="/assets/images/c/2024-04-04-smycky-a-podminky/if.png" description="Jedna z mnoha možností větvení programu za pomocí if podmínky" %}

Obrázek výše znázorňuje jednu takovou možnost rozvětvit chod programu za pomocí if podmínky. V programu se můžeme rozhodnout jít 2 různými cestami na základě toho, jestli je nějaká proměnná větší nebo menší než 0 (if podmínky vždy vyhodnocují pravdivostní, logické výrazy). Pokud bude číslo skryté za proměnnou x větší než 0, bude program pokračovat výrazem B, jinak výrazem A. Nikdy neprovede oba kroky najednou.

{% include image.html url="/assets/images/c/2024-04-04-smycky-a-podminky/if2.png" description="Jedna z mnoha možností větvení programu za pomocí if podmínky" %}

Toto představuje zase jinou možnost. Program vybočí ze své sekvence jenom v případě, že bude podmínka v if-u pravdivá. Pokud ne, nic neobvyklého se nestane, program bude pokračovat hned za if-blokem.

{% include image.html url="/assets/images/c/2024-04-04-smycky-a-podminky/if3.png" description="Jedna z mnoha možností větvení programu za pomocí if podmínky" %}

If-blocky a podmínky je také možné vkládat do sebe a dostávat se tak k dalším if otázkám jen tehdy, pokud už ty předtím byly nějak vyhodnoceny. Podívejte se na obrázek výše. Pokud by první podmínka byla vyhodnocena jako nepravdivá, bude program pokračovat bloky A a C. Bude-li však první podmínka vyhodnocena jako pravdivá a stejně tak druhá, program nikdy k blokům A a B nedojde a rovnou bude pokračovat blokem C. Pokud by byla první podmínka pravdivá a druhá nepravdivá, půjde program přes bloky B a C (a vynechá tedy A).

Větvení pomocí if-podmínek může mít formu samotného if, if v kombinaci s else, případně if v kombinaci s else if zakončeným samotným else.

Pokud by za if následoval jenom jeden jediný příkaz, není potřeba ho psát do bloku (tzn. do složených závorek). Pokud by následovalo vícero příkazů, je vždy nutné je uzavřít do složených závorek, bloku, aby bylo programu jasné, co všechno má provést v případě, že by byla splněna podmínka v if.

I kdybyste závorky nepotřebovali, vždy myslete na odsazení! Úplně na začátku jsem zmiňovala, že je potřeba psát kód tak, aby ho mohli číst i jiní. (Na odsazení myslete i kdykoliv jindy, i když budete psát hezky závorky a do bloku.)

### Ternární operátor

Některé programovací jazyky nabízejí tzv. ternární operátor. Již o něm byla zmínka v předminulé kapitole, kde jsme si řekli, že je to operátor, který ke svému fungování vyžaduje 3 operandy. Teď, u if-podmínek, si jeho fungování můžeme vysvětlit blíže.

Ternární operátor se skládá z op1 ? op2 : op3 (přičemž op je operand, neboli člen, který se účastní operace). Výsledek odečítáme nějak takto: pokud je pravda op1, pak mi dej op2, jinak op3. Nezní vám to povědomě? Ano, je to to samé, jako byste udělali if-podmínku na op1, která by zastřešovala blok op2 a která by měla else-větev, která by zastřešovala op3.

Použití by mohlo vypadat následovně:

{% highlight c %}
#include <stdio.h>

int main(void) 
{
    int cislo = 5;

    printf("Cislo je sude: %s\n", (cislo % 2 == 0) ? "ANO" : "NE");

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/ternary0.c){:target="_blank"})

Výsledek by byl stejný jako za použití if-else konstruktu:

{% highlight c %}
#include <stdio.h>

int main(void) 
{
    int cislo = 5;

    if (cislo % 2 == 0)
    {
        printf("Cislo je sude: ANO\n");
    } else 
    {
        printf("Cislo je sude: NE\n");
    }

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/ternary1.c){:target="_blank"})

### Switch case

Switch nabízí další možnost zápisu na bázi if-podmínek.

Představte si následující situaci: Uživatel dostane na výběr ze 4 světových stran a vy pak na základě jeho volby budete nějak v programu pokračovat. Toto můžete buď vyřešit formou 4 samostatných if, případně složeného if-else výrazu. Anebo switch konstrukcí. Ale asi nejjednodušší bude si to ukázat na příkladu.

Za pomocí námi známých if-else podmínek by program mohl vypadat následovně:

{% highlight c %}
#include <stdio.h>

int main(void)
{
    // Ahoj uzivateli! Prosim zvol si jednu z nasledujicich moznosti:
    //   1: Rovne
    //   2: Leva
    //   3: Prava
    //   4: Zpet

    int volba = 3;

    if (volba == 1) 
    {
        printf("Pokracujes dal? OK!\n");
    } else if (volba == 2)
    {
        printf("Hura doleva!\n");
    } else if (volba == 3) 
    {
        printf("Prava je ta prava...\n");
    } else if (volba == 4)
    {
        printf("Jak jen to bylo... 1 krok dopredu a 2 dozadu?\n");
    } else 
    {
        printf("Nepodvadime! Vyber si jednu z nabizenych moznosti, jina neni.\n");
    }

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/switch1.c){:target="_blank"})

A takhle, když použijeme switch:

{% highlight c %}
#include <stdio.h>

int main(void)
{
    // Ahoj uzivateli! Prosim zvol si jednu z nasledujicich moznosti:
    //   1: Rovne
    //   2: Leva
    //   3: Prava
    //   4: Zpet

    int volba = 3;

    switch (volba)
    {
        case 1: 
            printf("Pokracujes dal? OK!\n");
            break;
        case 2:
            printf("Hura doleva!\n");
            break;
        case 3:
            printf("Prava je ta prava...\n");
            break;
        case 4: 
            printf("Jak jen to bylo... 1 krok dopredu a 2 dozadu?\n");
            break;
        default:
            printf("Nepodvadime! Vyber si jednu z nabizenych moznosti, jina neni.\n");
    }

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/switch.c){:target="_blank"})

Do závorky za klíčové slovo *switch* jde proměnná, jejíž hodnota se bude posuzovat. Hodnota musí být celočíselná. Následují případy, neboli *case*. Pokud nastane případ, kdy proměnná *volba* bude rovna 1, pak nám program na konzoli vydá "Pokracujes dal? OK!", atd. Klíčové slovo *break* opouští switch. Schválně si zkuste smazat *break*, který je součástí třetího case-u a program znovu zkompilujte a spusťte. Vidíte rozdíl? Bez *break* program propadne do další větve, mluvíme o propadávacím switch case konstruktu. No a nakonec případ *default* - ten je jako poslední else větev o program výše. Nenastane-li žádný z uvedených případů, pak se provede jakýkoli příkaz, který je udaný v defaultním případu. Pokud by chyběl, nestalo by se v rámci switch větvení nic (pokud by zároveň nenastal žádný z uvedených případů). Také si všimněte, že case nepotřebuje složené závorky pro svůj blok.

### Příklady

<!-- Example 1 -->
Napište program, který uživateli na základě věku vyhodnotí, kterého řidičského oprávnění by již mohl dosáhnout. Potřebné údaje můžete získat např. [zde (§ 83)](https://www.zakonyprolidi.cz/cs/2000-361). Ještě jsme si neukázali, jak získat vstupy od uživatele, proto si věk uložte do nějaké proměnné. Důležité je, že pak za pomocí if podmínek na konzoli uvidíte odpovídající výstup.

Takto by např. mohl vypadat výstup pro věk 19 let:

{% highlight console %}
Vek: 19 let
Splnujes vekovou hranici pro ridicske opravneni skupiny A2, B, B+E, C1 a C1+E. {% endhighlight %}

<!-- Example 1 solution -->

<details>
  <summary><u>Možné řešení: </u></summary>
<br />
{% highlight c %}
#include <stdio.h>

int main(void)
{
    int vek = 10;

    printf("Vek: %d\n", vek);

    if (vek >= 24)
    {
        printf("Splnujes vekovou hranici pro ridicske opravneni skupiny AM, A1, B1 a T, A2, B, B+E, C1 a C1+E, C, C+E, D1, D1+E, A, D, D+E.\n");
    } else if (vek >= 21)
    {
        printf("Splnujes vekovou hranici pro ridicske opravneni skupiny AM, A1, B1 a T, A2, B, B+E, C1 a C1+E, C, C+E, D1, D1+E.\n");
    } else if (vek >= 18)
    {
        printf("Splnujes vekovou hranici pro ridicske opravneni skupiny AM, A1, B1 a T, A2, B, B+E, C1 a C1+E.\n");
    } else if (vek >= 17)
    {
        printf("Splnujes vekovou hranici pro ridicske opravneni skupiny AM, A1, B1 a T.\n");
    } else if (vek >= 16)
    {
        printf("Splnujes vekovou hranici pro ridicske opravneni skupiny AM, A1.\n");
    } else if (vek >= 15)
    {
        printf("Splnujes vekovou hranici pro ridicske opravneni skupiny AM.\n");
    } else {
        printf("Nesplnujes vek pro zadne ridicske opravneni!\n");
    }

    return 0;
} {% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/if1.c" target="_blank">(Odkaz na GitHub)</a>
<br />

Víte, co se stane, když program postavíte na samotných if? Tedy bez else? A co se stane, když vynecháte složené závorky mezi if-else? Do toho, vyzkoušejte si to, pokud si nejste jistí! 🙃
</details>
<br />

<!-- Example 2 -->

Podívejte se na následující program. Víte, jak by bylo možné ho přepsat, aby neobsahoval dvě if-podmínky vložené do sebe?
{% highlight c %}
#include <stdio.h>

int main(void)
{
    int cislo = 5;

    if (cislo >= 0)
    {
        if (cislo <= 10)
        {
            printf("Zadane cislo %d je v intervalu 0-10!\n", cislo);
        }
    }

    return 0;
} {% endhighlight %}

<!-- Example 2 solution -->

  <details>
    <summary><u>Řešení: </u></summary>
<br />
{% highlight c %}
#include <stdio.h>

int main(void)
{
    int cislo = 11;

    if (cislo >= 0 && cislo <= 10) {
        printf("Zadane cislo %d je v intervalu 0-10!\n", cislo);
    }

    return 0;
} {% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/if2.c" target="_blank">(Odkaz na GitHub)</a>

Oba příklady nedělají nic jiného, než že nejdříve zkontrolují, zda je číslo větší nebo rovno 0 a potom, zda je menší nebo rovno 10. To lze udělat buď za pomocí dvou if-podmínek, nebo spojením logickým AND operátorem (&&).
  </details>
<br />

<!-- Example 3 -->

Poznáte, co je tady špatně?

{% highlight c %}
#include <stdio.h>

int main(void)
{
    int cislo = -1;

    if (cislo >= 0)
        printf("Cislo je vetsi nebo rovno 0!\n");
        if (cislo <= 10)
            printf("Cislo se nachazi v intervalu 0-10!\n");

    return 0;
} {% endhighlight %}

<!-- Example 3 solution -->

  <details>
    <summary><u>Řešení: </u></summary>
<br />
Hmm, výstup není takový, jaký se na první pohled zdá být. Tohle je příklad toho, jak se nemá používat odsazení a že je vhodné používat závorky na ohraničení bloků.

Správně odsazený program by mohl vypadat následovně (nehleďte přitom na to, že je nyní krásně vidět, že nedělá to, co by měl):

<br />
<br />
{% highlight c %}
#include <stdio.h>

int main(void)
{
    int cislo = -1;

    if (cislo >= 0)
        printf("Cislo je vetsi nebo rovno 0!\n");

    if (cislo <= 10)
        printf("Cislo se nachazi v intervalu 0-10!\n");

    return 0;
} {% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/if3-1.c" target="_blank">(Odkaz na GitHub)</a>

Program s použitím závorek na ohraničení bloku, bez vhodného odsazení:

<br />
<br />
{% highlight c %}
#include <stdio.h>

int main(void)
{
    int cislo = -1;

    if (cislo >= 0) 
    {
        printf("Cislo je vetsi nebo rovno 0!\n");
    }
       
        if (cislo <= 10)
        {
            printf("Cislo se nachazi v intervalu 0-10!\n");
        }

    return 0;
} {% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/if3-2.c" target="_blank">(Odkaz na GitHub)</a>

Použití vhodného odsazení a složených závorek na ohraničení bloku, který náleží k if-podmínce:

<br />
<br />
{% highlight c %}
#include <stdio.h>

int main(void)
{
    int cislo = -1;
     
    if (cislo >= 0) 
    {
        printf("Cislo je vetsi nebo rovno 0!\n");
    }
        
    if (cislo <= 10)
    {
        printf("Cislo se nachazi v intervalu 0-10!\n");
    }

    return 0;
} {% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/if3-3.c" target="_blank">(Odkaz na GitHub)</a>

Sami posuďte, které řešení se vám zdá nejčitelnější a na první pohled srozumitelné.


  </details>
<br />

<!-- Example 4 -->

Napadá vás, jak byste napsali program, který vám řekne, které ze dvou čísel je větší?

<!-- Example 4 solution -->

  <details>
    <summary><u>Řešení: </u></summary>
<br />
{% highlight c %}
#include <stdio.h>

int main(void)
{
    int x = 10;
    int y = 15;

    printf("Posuzovana cisla: %d a %d\n", x, y);
    printf("Max je: %d\n", x > y ? x : y);

    return 0;
} {% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/ternary2.c" target="_blank">(Odkaz na GitHub)</a>

  </details>
<br />

## Smyčky

Po podmínkách se nyní vrhněme na smyčky. V Céčku používáme 3 typy smyček - while, do-while a for. V angličtině smyčku nazýváme loop. Hlavním rozdílem mezi těmito 3 smyčkami je ten, že do-while je vykonána alespoň jednou, protože podmínka stojí až na konci. Takže jakékoli příkazy stojí v bloku patřící k do-while budou alespoň jednou vykonány, než dojde ke kontrole, zda je vůbec splněna podmínka (a tedy budou vykonány i v případě, že podmínka není splněna). U ostatních je vždy nejdříve zkontrolována podmínka než se program vrhne na příkazy stojící v bloku pod podmínkou smyčky.

### While loop

While by se dalo přeložit jako "dokud". A přesně tak i funguje while-smyčka. Dokud je platná nějaká podmínka, bude vykonáváno cokoliv, co stojí v těle smyčky. A stejně jako u podmínek - následuje-li po řádku s while-podmínkou pouze 1 příkaz, není třeba složených závorek, ale má-li být v těle smyčky vykonáno vícero příkazů, je nutné je uzavřít do bloku právě složenými závorkami.

Častou pastí u while-smyčky je tzv. nekonečná smyčka. K té dojde v případě, že podmínka nikdy nebude nepravdivá a tudíž program "do nekonečna" poběží v oné smyčce. Do nekonečna v uvozovkách proto, že program spíše dříve krachne, než aby vám fakt běžel už nafurt.

Jak už jsem nahoře zmínila, smyčky mají společné vlastnosti a body. Ukážu vám na příkladě, že se dají použít na jeden a ten samý příklad všechny tři.

V následujícím příkladu budeme počítat faktoriál čísla. Podle [Wikipedie](https://cs.wikipedia.org/wiki/Faktori%C3%A1l) je faktoriál čísla n roven součinu všech kladných čísel menších nebo rovných n. Tudíž např. faktoriál čísla 5 je 5! = 1 * 2 * 3 * 4 * 5 = 120.

{% highlight c %}
#include <stdio.h>

int main(void) {
    int n = 5;
    int factorial = 1;

    while (n > 0) {
        factorial *= n;
        n--;
    }

    printf("Faktorial cisla 5 je %d\n", factorial);
    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/while.c){:target="_blank"})

Jen tak pro zajímavost a vyhrání si, program by šlo napsat i následovně:

{% highlight c %}
#include <stdio.h>

int main(void) {
    int n = 5;
    int factorial = 1;

    while (n > 0) {
        factorial *= n--;
    }

    printf("Faktorial cisla 5 je %d\n", factorial);
    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/while2.c){:target="_blank"})

Případně i takto:

{% highlight c %}
#include <stdio.h>

int main(void) {
    int n = 0;
    int factorial = 1;

    while (++n <= 5) {
        factorial *= n;
    }

    printf("Faktorial cisla 5 je %d\n", factorial);
    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/while3.c){:target="_blank"})

Pro přehlednost (a čitelnost) doporučuji první variantu. Také se tím snázeji vyvarujete chyb. Např. tzv. off-by-one-error je něco, co se lehce může stát, hlavně v případě, že budete program psát tak, jako znázorňuje poslední příklad. Porovnejte s následujícím:

{% highlight c %}
#include <stdio.h>

int main(void) {
    int n = 0;
    int factorial = 1;

    while (n++ <= 5) {
        factorial *= n;
    }

    printf("Faktorial cisla 5 je %d\n", factorial);
    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/while4.c){:target="_blank"})

Proměnná použitá v podmínce, naše n (často se v programování setkáte s proměnnou nazvanou i, nebo třeba counter), je ke konci o 1 vyšší, než bysme vlastně chtěli! A tudíž i výsledek je špatně v tomto případě.

### Do ... While

Dalším typem smyčky je tzv. do ... while. Na rozdíl od while se program do bloku, těla smyčky dostane alespoň jedenkrát. Hodí se třeba v případě, že potřebujete zkontrolovat vstupy dodané zvenčí, od uživatelů - tak dlouho budete chtít input, dokud nebude v pořádku.

Příklad s faktoriálem s použitím do-while smyčky by mohl vypadat následovně:

{% highlight c %}
#include <stdio.h>

int main(void) {
    int n = 5;
    int factorial = 1;

    do {
        factorial *= n;
        n--;
    } while (n > 0);

    printf("Faktorial cisla 5 je %d\n", factorial);

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/dowhile.c){:target="_blank"})

Všimněte si středníku za while. Pokud byste dali středník za while shora, pak by to bylo vyhodnoceno jako smyčka s prázdným tělem/blokem. Cokoli by stálo pod while by k němu už vlastně nepatřilo.

I zde je možné program zkrátit a třeba i vynechat složené závorky, pokud se blok mezi do a while skládá pouze z jediného příkazu.

{% highlight c %}
#include <stdio.h>

int main(void) {
    int n = 5;
    int factorial = 1;

    do 
        factorial *= n;
    while (--n);

    printf("Faktorial cisla 5 je %d\n", factorial);

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/dowhile2.c){:target="_blank"})

Vzpomeňte si, že v C je nepravda znázorněna číslem 0 a pravda jakýmkoli jiným číslem. Podmínka ve while je tedy nepravdivá (a smyčka tím pádem ukončená) ve chvíli, kdy se číslo n rovná 0.

### For loop

{% include image.html url="/assets/images/c/2024-04-04-smycky-a-podminky/for.JPG" description="Syntaxe cyklu for" %}

Syntaxe cyklu for je znázorněna na obrázku výše. Skládá se z proměnné/proměnných, které jsou nějakým způsobem inicializovány, následuje podmínka (jako u while) a nakonec krok nebo příkaz. Init-část je provedena před prvním cyklem, část s podmínkou na začátku každého cyklu a krok na konci každého cyklu. Celé bychom to mohli přepsat do while-cyklu, který by vypadal nějak následovně:

{% include image.html url="/assets/images/c/2024-04-04-smycky-a-podminky/while.JPG" description="Syntaxe while-cyklu odpovídající cyklu for výše" %}

Náš příklad s faktoriálem přepsaný do podoby for-cyklu bude vypadat takto:

{% highlight c %}
#include <stdio.h>

int main(void) {
    int factorial = 1;
    for (int n = 5; n > 0; n--) {
        factorial *= n;
    }

    printf("Faktorial cisla 5 je %d\n", factorial);

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/for.c){:target="_blank"})

Pokud se podivujete, proč není factorial inicializován stejně jako n na počátku for-cyklu, pak je to proto, že v programování existují jistá pravidla pro viditelnost proměnných, tzv. scope proměnných (detailněji k tomu možná někdy příště). Prozatím si pamatujte, že proměnné, které inicializujeme ve for-cyklu, jsou pouze v tomto cyklu použitelné. Pokud byste program napsali a zkompilovali následovně, dostali byste chybovou hlášku od compileru:

{% highlight c %}
#include <stdio.h>

int main(void) {
    for (int n = 5, factorial = 1; n > 0; n--) {
        factorial *= n;
    }

    printf("Faktorial cisla 5 je %d\n", factorial);

    return 0;
} {% endhighlight %}

Pro úplnost ještě pár příkladů nehezky psaných cyklů (i když funkčních). Ale posuďte sami.

{% highlight c %}
#include <stdio.h>

int main(void) {
    int factorial = 1;
    for (int n = 6; --n > 0; ) {
        factorial *= n;
    }

    printf("Faktorial cisla 5 je %d\n", factorial);

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/for2.c){:target="_blank"})

{% highlight c %}
#include <stdio.h>

int main(void) {
    int factorial = 1;
    int n = 6;
    
    for ( ; --n; factorial *= n);

    printf("Faktorial cisla 5 je %d\n", factorial);

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/for3.c){:target="_blank"})

Zajímavost na konec - víte, proč je za for-cyklem v příkladu výše středník i přesto, že jsem na začátku psala, že se středník píše jenom za do-while cyklem? 

  <details>
    <summary><u>Proč je na konci for-cyklu středník?</u></summary>
    <br />
Pokud jste si prográmek upravili a zkompilovali bez středníku, všimli jste si, že vám na konzoli vyjede několikrát text z printf. A to proto, že při překladu programu kompilátor ignoruje prázdné řádky a do těla, bloku cyklu zabalí jakýkoli vykonatelný příkaz, který následuje (pouze tento 1, protože za smyčkou nejsou žádné složené závorky, které by nám udávali hranice většího bloku).
<br /><br />
  </details>
<br />

### Break a continue

Break a continue představují klíčová slovíčka využitelná pro manipulaci cyklů. Break cyklus opustí a program bude pokračovat pod ním. Klíčovým slovem continue se přeruší pouze aktuální běh cyklu a program bude pokračovat dalším kolem.

{% highlight c %}
#include <stdio.h>

int main(void) {
    int number = 5;
    int stop = 1;

    while (1) {
        if (number % 2 == 0) 
            printf("Pong\n");
        else 
            printf("Ping\n");

        number--;
        if (number == stop) 
            break;
    }

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/break.c){:target="_blank"})

Příklad výše znázorňuje tzv. nekonečný cyklus, endless loop. Všimněte si 1 v podmínce pro while. A jak víme, jednička je pravda - takže tento cyklus teoreticky poběží pořád, protože 1 je prostě vždy pravdivá. Není tomu tak v našem případě, protože se z cyklu můžeme vymanit pomocí klíčového slova break. Program tedy nedělá nic jiného, než že vyhodí na konzoli "Ping", pokud je číslo liché, a "Pong", pokud je sudé. Jakmile se číslo dostane na určitou hodnotu (která je dána proměnnou "stop"), cyklus opouštíme.

{% highlight c %}
#include <stdio.h>

int main(void) {
    int stop = 1;
    int number = 5;

    printf("Licha cisla v internvalu [%d, %d] jsou: ", stop, number);
    for ( ; number >= stop; number--) {
        if (number % 2 == 0)
            continue;
        printf(" %d", number);
    }
    printf("\n");

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-04-04-smycky-a-podminky/continue.c){:target="_blank"})

Program výše ukazuje využití klíčového slovíčka continue. Program nemá za úkol nic jiného, než vytisknout všechna lichá čísla v určitém intervalu. Pokud je číslo sudé (zbytek po dělení 2 je 0), pak slovíčkem continue opouštíme nynější kolo a program skočí znovu na začátek for-cyklu. Ke klíčovému slovu continue se program nedostane, pokud je číslo liché, a pokračuje tedy pod podmínkou řádkem s příkazem printf. (Řešením by samozřejmě mohlo být i zabalení printf do podmínky na lichá čísla, ale pak byste neviděli využití continue.)

Klíčová slova break a continue je možné použít jen v kombinaci s podmínkami a působí pouze na vnitřní cyklus (pokud jich je více v sobě). Měla by se používat pouze ve výjimečných případech.

## Shrnutí cyklů

Cykly by měly být formulovány tak, aby bylo na první pohled jasné odkud kam cyklus poběží a kdy program cyklus opustí.

Do-while cyklus nachází využití tam, kde by měl zvolený cyklus alespoň jednou proběhnout. For cyklus pak tehdy, pokud máme k dispozici a chceme využít části "INIT" a "KROK" (viz obrázek výše v kapitole [For loop](https://kaelwi.github.io/programovaci-jazyk-c/smycky-a-podminky#for-loop)). Pro všechny ostatní případy je možné použít while cyklus.

Klíčová slovíčka break a continue ovlivňují přirozený běh cyklů a měli by se využívat jen vyjímečně.

## Kam dál?

{% comment %} [scanf, aneb formátované načítání]({% post_url c/2023-09-07-scanf %}) {% endcomment %}
