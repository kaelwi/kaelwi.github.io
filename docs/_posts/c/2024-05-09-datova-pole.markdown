---
layout: post
title:  "Datová pole (arrays)"
date:   2024-05-09 07:00:00 +0200
last_modified_at: 2024-05-09 07:00:00 +0200
category: Programovací jazyk C
read_time: 5 min 41 s
description: Datová pole (angl. arrays) v programovacím jazyce C. Struktury pro ukládání dat stejného typu.
permalink: programovaci-jazyk-c/datova-pole
---

[Předchozí [Další příklady]]({% post_url c/2024-05-02-dalsi-priklady %})

## Trochu teorie k datovým polím

Datové pole, neboli array anglicky, slouží k uložení množiny dat stejného typu. Taková pole mají pevně danou velikost, která musí být udána při deklaraci.

Na jednotlivá data je pak možné získat přístup přes jejich index. Tento index se počítá od nuly. Pokud tedy máme array o velikosti *n*, pak můžeme k datům přistupovat od indexu 0 do indexu *n-1*.

Data v poli mohou být inicializována už při deklaraci. Pokud je neinicializujeme, tedy neurčíme, co v poli má být, pak je sice paměť pro n kousků rezervován, avšak není definováno, co v ní je. Hodnota elementů je určena tím, co se v paměti na místě pole nacházelo před jeho deklarací. Takové hodnoty nazýváme *undefined*.

Jako příklad využití struktury datového pole můžu uvést např. výčet výsledků měření (např. teplota měřená během dne každou hodinu může být uložena v datovém poli o velikosti 24), nebo čísla vsazená při sportce (array o velikosti 6).

## Deklarace a inicializace datového pole

Deklaraci a inicializaci vám teď ukážu na tzv. *code snippets*. To znamená, že v následujících řádcích neuvidíte celý C-kód (kompilovatelný), ale pouze výstřižky. Na konci to ale celé pospojujeme do funkčního kódu.

### Deklarace datového pole

Array deklarujeme podobně jako nám dosud známé proměnné. Uvedeme nejprve datový typ (typ, který budou mít prvky v něm uložené), potom název našeho datového pole a následně nově v hranatých závorkách jeho velikost, tedy počet prvků, které v něm budou.

{% highlight c %}
int dny_v_mesici[12];
{% endhighlight %}

### Inicializace datového pole

Jak již bylo zmíněno nahoře, pokud datové pole neinicializujeme, pak si sice zarezervujeme potřebné místo v paměti (např. pro proměnnou nahoře - dny_v_mesici - by to bylo 12x velikost int, většinou 12x4 bytů), ale hodnoty v něm uložené nebudou definované.

Datové pole můžeme inicializovat rovnou při deklaraci:

{% highlight c %}
int dny_v_mesici[12] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

int sazka[6] = { 1, 6, 9, 12, 24, 38 };
{% endhighlight %}

Při inicializaci nevadí, pokud budete mít na konci navíc čárku:

{% highlight c %}
int sazka[6] = { 1, 6, 9, 12, 24, 38, };
{% endhighlight %}

Také můžete vynechat velikost v hranatých závorkách, pokud inicializujete rovnou při deklaraci - compiler si velikost datového pole vyvodí z počtu prvků:

{% highlight c %}
int sazka[] = { 1, 6, 9, 12, 24, 38 };
{% endhighlight %}

Další fígle, zkratky a finty:

- prvky navíc jsou v poli při inicializaci ignorovány

{% highlight c %}
int sazka[6] = { 1, 6, 9, 12, 24, 38, 43 };
{% endhighlight %}

- zbývající prvky budou při opomenutí při inicializaci inicializovány hodnotou 0

{% highlight c %}
int sazka[6] = { 1, 6, 9 };
{% endhighlight %}

- inicializace přes index; ostatní hodnoty budou 0

{% highlight c %}
int sazka[6] = { [0]=1, [3]=6 };
{% endhighlight %}

- inicializace přes index; ostatní hodnoty budou 0; první index (0) je možné vynechat

{% highlight c %}
int sazka[6] = { 1, [3]=6, [4]=9 };
{% endhighlight %}

- inicializace přes index; ostatní hodnoty budou 0; index je možné vynechat, pokud námi daná hodnota následuje ihned po jiné, která je udána přes index (tzn. v tomto případě bude hodnota 9 stát v poli hned za hodnotou 6)

{% highlight c %}
int sazka[6] = { 1, [3]=6, 9 };
{% endhighlight %}

## Přístup k prvkům a velikost datového pole

K prvkům datového pole můžeme přistupovat nejenom proto, abychom si zjistili, jaká hodnota se na daném místě nachází, ale můžeme přes tento přístup hodnotu v datovém poli i měnit, případně s ní počítat.

### Přístup k prvkům datového pole

Jak jsem už zmínila úplně v úvodu, k jednotlivým prvkům datového pole přistupujeme přes jejich index. Index začíná na pozici 0 a končí na pozici n-1 (přičemž n značí velikost našeho datového pole).

Např. chceme-li si nechat na konzoli vyjet, kolik dní má únor (pozor! únor se nachází na pozici 1, protože index běží od nuly), pak by to šlo následovně:

{% highlight c %}
int dny_v_mesici[12] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

printf("Unor: %d\n", dny_v_mesici[1]);
{% endhighlight %}

Pokud bysme měli funkci, která nám vrátí, jestli je rok přestupný, nebo ne, pak by bylo možné hodnotu na pozici 1 třeba i měnit:

{% highlight c %}
int dny_v_mesici[12] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

if (prestupny_rok(rok))
{
    dny_v_mesici[1] = 29;
}
{% endhighlight %}

Datové pole můžeme přes index i plnit. Následující výstřižek představuje smyčku, přes kterou se plní datové pole s názvem *array*. Hodnoty v poli na konci budou { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 }.

{% highlight c %}
for (int i = 0; i < 10; i++)
{
    array[i] = i;
}
{% endhighlight %}

### Velikost datového pole

Velikost datového pole není pouze počet jeho prvků, nýbrž počet prvků * velikost datového typu prvku. Například velikost pole (sizeof(sazka)) o 6 celočíselných proměnných bude 6 * sizeof(int).

## 2D datová pole

Datové pole může obsahovat další datová pole. Pak je to tzv. dvoudimenzionální datové pole. Využití najde například při počítání s maticemi, znázornění šachového pole, měření teplot o více dnech, vyplnění vícero sloupečků.

Datové pole pro 3 sloupečky sportky by mohlo vypadat následovně:

{% highlight c %}
int sazka[3][6] = { { 1, 6, 9, 12, 24, 38, 43 }, 
    { 3, 6, 15, 24, 33, 39 },
    { 1, 7, 8, 21, 29, 31, 33 }};
{% endhighlight %}

Přístup k čtvrtému číslu druhého sloupečku by pak fungoval následovně:

{% highlight c %}
sazka[1][3];
{% endhighlight %}

Iterovat pak musíte přes 2 smyčky (přes každý řádek a každý sloupeček vlastně):

{% highlight c %}
for (int sloupecek = 0; sloupecek < 3; sloupecek++)
{
    printf("%d. sloupecek: \n", sloupecek+1);
    for (int cislo = 0; cislo < 6; cislo++)
    {
        printf("%d ", sazka[sloupecek][cislo]);
    }
    printf("\n");
}
{% endhighlight %}

Výstřižek výše by na konzoli zobrazil následující text:

{% highlight console %}
1. sloupecek:
1 6 9 12 24 38
2. sloupecek:
3 6 15 24 33 39
3. sloupecek:
4. 1 7 8 21 29 31
{% endhighlight %}

## Příklady

Napište prográmek, který od uživatele vyžádá číslo od 2 do 5 a následně do datového pole uloží nultou, první, ..., čtvrtou mocninu onoho čísla. Nápomocná při počítání s mocninami by vám mohla být opět knihovna math.h. Výsledné datové pole si nechte vydat na konzoli.

Nezapomeňte, že je potřeba program kompilovat následovně (s -lm):

{% highlight console %}
clang -Wall mocniny.c -lm
{% endhighlight %}

  <details>
    <summary><u>Řešení:</u></summary>
    <br />
{% highlight c %}
#include <stdio.h>
#include <math.h>

int main(void)
{
    int cislo;
    printf("Zvol si cislo od 2 do 5: ");
    scanf("%d", &cislo);

    int mocniny[5];

    for (int i = 0; i < 5; i++)
    {
        mocniny[i] = pow(cislo, i);
    }

    for (int i = 0; i < 5; i++)
    {
        printf("%d. mocnina cisla %d je %d\n", i, cislo, mocniny[i]);
    }

    return 0;
} {% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-05-09-datova-pole/mocniny.c" target="_blank">(Odkaz na GitHub)</a>
<br /><br />
  </details>
<br />

Napište program, který na konzoli vytiskne tabulku malé násobilky (tabulku najdete například [zde](https://www.matematika.cz/tabulka-mala-nasobilka/)).

 <details>
    <summary><u>Řešení:</u></summary>
    <br />

V zadání už máme klíčové slovo *tabulka*, které by nám mělo napovědět, že budeme potřebovat 2D datové pole. Toto datové pole pak bude mít velikost 10 x 10 prvků.
<br /><br />

Pro zaplnění i vytisknutí budeme potřebovat 2 smyčky (v sobě).
<br /><br />

Aby byla čísla hezky zarovnaná, použila jsem format specifier <em>%2d</em>.
<br /><br />

{% highlight c %}
#include <stdio.h>

int main(void)
{
    int nasobilka[10][10];

    for (int radek = 0; radek < 10; radek++)
    {
        for (int sloupecek = 0; sloupecek < 10; sloupecek++)
        {
            nasobilka[radek][sloupecek] = (radek + 1) * (sloupecek + 1);
        }
    }

    for (int radek = 0; radek < 10; radek++)
    {
        for (int sloupecek = 0; sloupecek < 10; sloupecek++)
        {
            printf("%2d ", nasobilka[radek][sloupecek]);
        }
        printf("\n");
    }

    return 0;
} {% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-05-09-datova-pole/mala-nasobilka.c" target="_blank">(Odkaz na GitHub)</a>
<br /><br />
  </details>
<br />

## Kam dál?

{% comment %} [Textové řetězce (strings)]({% post_url c/2023-09-25-textove-retezce %}) {% endcomment %}
