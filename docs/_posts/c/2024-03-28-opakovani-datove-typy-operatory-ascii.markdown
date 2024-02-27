---
layout: post
title:  "Opakování - datové typy, operátory, ASCII"
date:   2024-03-28 07:00:00 +0200
last_modified_at: 2024-03-28 07:00:00 +0200
category: Programovací jazyk C
read_time: 6 min 22 s
description: Opakování dosud probraného - datové typy, operátory, ASCII tabulka. Pár příkladů k těmto tématům.
excerpt: Opakování dosud probraného - datové typy, operátory, ASCII tabulka. Pár příkladů k těmto tématům.
permalink: programovaci-jazyk-c/opakovani-datove-typy-operatory-ascii
---

[Předchozí [Operátory v C]]({% post_url c/2024-03-21-operatory-v-c %})

Tak se zase hlásím! A začnu hned opakováním a pár příklady, ať je jistota, že vše pasuje a sedí 😉.

## Dělení

Prohlédněte si následující kód. Dokážete tipnout, jaký bude výstup?

<!--- Example 1a -->

{% highlight c %}
#include <stdio.h>
int main(void) {
    float x;
    x = 5 / 2;
    printf("Výsledek: %.2f\n", x);
    return 0;
}
{% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím [odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex1a.c){:target="_blank"})

<!--- Example 1a solution -->

<details>
  <summary><u>Řešení (klikni na šipečku)</u></summary>
<br />
{% highlight console %} Výsledek: 2.00 {% endhighlight %}

  Dělíte-li celé číslo celým číslem, bude výsledek vždy celé číslo. A je jedno, že ho ukládáte do proměnné, která by mohla pojmout desetinné číslo.
  <br /><br />

  Pozn.: Format specifier výše udává, že do textu bude vloženo desetinné číslo (f) a že bude omezeno na 2 místa za desetinnou čárkou (.2).
<br /><br />

<!--- Example 1b -->
  Zkusíte kód přepsat tak, aby byl výsledek správný?
<br /><br />

<!--- Example 1b solution -->
  <details>
    <summary><u>Řešení 2 - upravený kód</u></summary>
<br />
{% highlight c %}
#include <stdio.h>
int main(void) {
  float x;
  x = 5.0 / 2;
  printf("Výsledek: %.2f\n", x);
  return 0;
} {% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím <a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex1b.c" target="_blank">odkazem</a>)
<br /><br />

    Stačí, aby jeden z operandů byl desetinným číslem, aby byl i výsledek desetinným číslem!

    Ideálně si oba prográmky zkuste zkompilovat a spustit. Pro připomenutí (pokud se váš soubor jmenuje <em>ex1.c</em>):

{% highlight console %}
clang ex1.c {% endhighlight %}

    Případně, pokud chcete, aby vám compiler zobrazil i varování (nejenom chyby), a výsledný, spustitelný program měl jiný název než a.out (např. ex1), zkompilujte následovně:

{% highlight console %}
clang -Wall -Wextra -pedantic -o ex1 ex1.c {% endhighlight %}
  </details>
</details>
<br />

## ASCII tabulka

ASCII tabulku jsem krátce zmínila ve druhém díle ([První program, datové typy a printf]({% post_url c/2024-03-14-prvni-program-datove-typy-a-printf %})). Tabulku tvoří tisknutelné a netisknutelné znaky a jejich ekvivalent v číselné podobě (desítkové, šestnáctkové a osmičkové soustavě) a jejich HTML znak.

{% include image.html url="/assets/images/c/2024-03-28-opakovani-datove-typy-operatory-ascii/asciifull.jpg" description="ASCII tabulka, převzato z https://www.asciitable.com/" %}

Červeně jsem označila znaky, které nejsou tisknutelné. Schválně si zkuste přeložit a spustit následující kód, případně můj znak nahraďte jiným a koukněte, co se stane (tip: zapněte si zvuky u PC).

<!--- Example 2 -->

{% highlight c %}
#include <stdio.h>
int main(void) {
  char a = 7;
  printf("Netisknutelný znak %c\n", a);
  return 0;
} {% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím [odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex2.c){:target="_blank"})

Věnujte chvíli pozornost tzv. *format specifier*, který udává, jak má program zpracovat výstup proměnné udané na místě dalších parametrů (prvním parametrem je náš textový řetězec, který může obsahovat takováto rezervovaná místa, která jsou následně ve výstupu nahrazena tím, co následuje za textovým řetězcem). V kódu výše udává %c, že bude (měl by) následovat tzv. *character*, *char*, tedy jednotlivý znak.

<!--- Example 2 solution -->

  <details>
    <summary><u>Co tedy bude výstupem?</u></summary>
    <br />
Znak s číslem 7 je podle ASCII tabulky *bell*, neboli zvukový signál. Na konzoli se nám tedy zobrazí pouze text <em>Netisknutelný znak </em>, ale měl by být slyšet zvukový signál.

Pokud byste v řetězci udali, že má být výstupem číslo, např. pomocí format specifieru %d, pak by nenásledoval žádný zvukový signál, ale na konzoli byste měli vidět text <em>Netisknutelný znak 7</em>. Vyzkoušejte si to! <!--- Example 2b --> (Kód je jako vždy k nalezení i na GitHubu a to pod následujícím <a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex2b.cc" target="_blank">odkazem</a>)
<br /><br />
  </details>
<br />

Další ukázkou práce s ASCII tabulkou a znaky by mohl být následující program. Zkuste si nejdřív v hlavě (a za pomocí tabulky) tipnout, co by tak mohlo být výstupem!

<!--- Example 3 -->

{% highlight c %}
#include <stdio.h>

int main(void)
{
  int a1 = 0x41;	// 0x znamena, ze se nejedna o decimal, ale o hexadecimal
  int a2 = 0150;	// 0 na zacatku znaci oktal
  int a3 = 111;
  int a4 = a2 + 2;
  int a5 = '!';

  printf("%c%c%c%c%c\n", a1, a2, a3, a4, a5);

  return 0;
} {% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím [odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex3.c){:target="_blank"})

<!--- Example 3 solution -->

  <details>
    <summary><u>Výstup na konzoli: </u></summary>
<br />
{% highlight console %}
Ahoj! {% endhighlight %}
  </details>
<br />

Všimněte si, že znaky jsou také jenom čísla. Můžeme tedy oboje zaměňovat a ukládat do char i int (pozor jenom na rozsah, pokud byste zaměňovali i jinde; u znaků problém zatím nehrozí), a také počty jsou možné.

A pro úplnost, pokud se nad tím někdo podivoval - jednoduché uvozovky slouží pro zápis znaků, dvojité pro textové řetězce.

## Operátory

Operátory můžeme dělit podle dvou kritérií:

- kolik operandů potřebují pro danou operaci
  - unární (např. inkrement a dekrement)
  - binární (např. klasické sčítání, tedy +)
  - ternární (zatím neznáme; jedná se o ? : operátor)
- na jaké pozici se nachází
  - infix (tak, jak to známe, např. a + b)
  - prefix (--a)
  - postfix (a++)

Zatím jsme poznali aritmetické, logické, inkrement a dekrement a srovnání. Existují i bitové nebo třeba operátor, kterým se získá adresa proměnné.

Následuje opět pár příkladů. Zkuste si nejdřív v hlavě promyslet, co by mohlo být výsledkem.

### Aritmetické operátory

<!--- Example 4 -->

{% highlight c %}
#include <stdio.h>

int main(void)
{
  int a = 10;
  int b = 4;

  printf("a = %d, b = %d\n\n", a, b);

  printf("%d\n", a / b);
  printf("%d\n", a % b);
  printf("%d\n", a += b);
  printf("%d\n", a /= b);

  printf("\na = %d, b = %d\n", a, b);

  return 0;
} {% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím [odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex4.c){:target="_blank"})

<!--- Example 4 solution -->

  <details>
    <summary><u>Výstup na konzoli: </u></summary>
<br />
{% highlight console %}
a = 5, b = 2

2
1
7
3

a = 3, b = 2 {% endhighlight %}

Pro objasnění, proč a kdy se co děje:

Hned na začátku tu máme dělení dvou celých čísel, jejichž výsledkem je opět celé číslo. To znamená, že cokoliv za desetinnou čárkou se prostě zahodí a tudíž 5 / 2 je 2, protože z 2.5 se 0.5 prostě odsekne, neproběhne žádné zaokrouhlení.
<br /><br />
Procento je tzv. modulo operátor, jehož výsledkem je zbytek celočíselného dělení. 5 / 2 je 2, zbytek 1.
<br /><br />
Následují zkrácené verze početních operací. Např. a += b je to samé jako a = a + b. Tudíž výstupem bude nejdříve 7 (protože a je nyní 5 + 2), potom 3 (protože 7 / 2 je 3, cokoli za desetinnou čárkou je zahozeno). První dva printf nezměnili hodnotu skrytou za proměnnou a nebo b!
<br /><br />
Poslední řádek slouží už jenom pro úplnost a vytiskne obsah proměnných a, b.
  </details>
<br />

### Logické operátory a srovnání

Zkusíte si tipnout, co bude výsledkem?

<!--- Example 5 -->

{% highlight c %}
#include <stdio.h>

int main(void) {
  int a = 5;
  int b = 2;
  int c = (b != 0) && (a / b);
  printf("%d\n", c);
} {% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím [odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex5.c){:target="_blank"})

<!--- Example 5 solution -->

  <details>
    <summary><u>Výsledek: </u></summary>
<br />
{% highlight console %}
1 {% endhighlight %}

Výsledkem není výsledek dělení. Výsledkem je v tomto případě pravdivostní hodnota (0 v případě nepravdy, jakékoli jiné číslo v případě pravdy). Nejdřív se zkontroluje, zda b není rovno nule (pokud ano, došlo by k tzv. <em>short circuit evaluation</em>, vyhodnocování by bylo přerušeno, protože nepravda a cokoliv dalšího je vždy nepravda) a potom se sice vyhodnotí výsledek dělení, avšak v tomto kontextu bude hrát roli jen a pouze jako pravdivostní hodnota (tudíž bude výsledek druhého výrazu pravda, protože výsledkem dělení je hodnota jiná než 0). Konečný výsledek je 1, neboli pravda.
  </details>
<br />

Snažte se vždy vyvarovat srovnávání desetinných čísel. Počítač ne vždy počítá s přesností, na jakou jsme zvyklí. I proto máme možnost využít float či double (double má 2x takovou přesnost). Pokud se dostanete do situace, že budete srovnávat desetinná čísla, použijte k tomu nějaké *epsilon*, hodnota v rámci které je srovnání ještě OK (např. +/- 0.00000001, při srovnání dvou čísel a, b by to vypadalo následovně: a > b - epsilon && a < b + epsilon; pokud by obě podmínky byly splněny, hledělo by se na a a b jako na dvě stejná čísla).

Ale pryč od teorie. Schválně si to vyzkoušejte.

<!--- Example 6 -->

{% highlight c %}
#include <stdio.h>

int main(void) {
  float a = 0.9f;
  printf("%d\n", a == 0.9);
  printf("%d\n", a == 0.9f);

  return 0;
} {% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím [odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex6.c){:target="_blank"})

<!--- Example 6 solution -->

  <details>
    <summary><u>Výsledek: </u></summary>
<br />
{% highlight console %}
0
1 {% endhighlight %}

V prvním případě je srovnáván float s double proměnnou, která má větší přesnost. Zkuste si obě čísla nechat vypsat na konzoli s přesností 8 a více míst a uvidíte rozdíl (připomínám, že toho jde dosáhnout format specifierem %.8f).
  </details>
<br />

<!--- Example 7 -->

{% highlight c %}
#include <stdio.h>

int main(void) {
  int a = 0;
  int b = 1;
  int c = a || (a || b) && (a > b);
  printf("%d\n", c);
  return 0;
} {% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím [odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex7.c){:target="_blank"})

<!--- Example 7 solution -->

  <details>
    <summary><u>Výsledek: </u></summary>
<br />
{% highlight console %}
0 {% endhighlight %}

  </details>
<br />

### Inkrement a dekrement

Jako i předtím - představím kód a vy si zkuste v hlavě projít, co by asi tak mohlo být výsledkem.

<!--- Example 8 -->

{% highlight c %}
#include <stdio.h>

int main(void) {
    int a = 1;
    int b = 1;
    printf("a = %d, b = %d\n", a, b);
    printf("%d\n", a++ + --b);
    printf("a = %d, b = %d\n", a, b);
    return 0;
} {% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím [odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex8.c){:target="_blank"})

<!--- Example 8 solution -->

  <details>
    <summary><u>Výsledek: </u></summary>
<br />
{% highlight console %}
a = 1, b = 1
1
a = 2, b = 0 {% endhighlight %}

  </details>
<br />

<!--- Example 9 -->

{% highlight c %}
#include <stdio.h>

int main(void) {
    int a = 1;
    int b = 1;
    int c = 1;
    printf("a = %d, b = %d, c = %d\n", a, ++b, c++);
    printf("c = %d\n", c);
    return 0;
} {% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím [odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex9.c){:target="_blank"})

<!--- Example 9 solution -->

  <details>
    <summary><u>Výsledek: </u></summary>
<br />
{% highlight console %}
a = 1, b = 2, c = 1
c = 2 {% endhighlight %}

  </details>
<br />

### Overflow a underflow

Již jsem zmínila nahoře, že je třeba dbát na možný rozsah jednotlivých datových typů. Téma již jsem načla i v [předposlední kapitole]({% post_url c/2024-03-14-prvni-program-datove-typy-a-printf %}), kód je k nalezení na [GitHubu](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-14-prvni-program-datove-typy-a-printf/datatypes.c){:target="_blank"}. Zkoušeli jste, co se stane, pokud povolený rozsah přesáhnete?

<!--- Example 10 -->

{% highlight c %}
#include <stdio.h>

int main(void) {
    unsigned char a = 0;
    a -= 1;
    printf("%d\n", a);

    char b = 127;
    printf("%d\n", b + 1);

    char c = 567;
    printf("%d\n", c);

    return 0;
} {% endhighlight %}

(Kód je jako vždy k nalezení i na GitHubu a to pod následujícím [odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-28-opakovani-datove-typy-operatory-ascii/ex10.c){:target="_blank"})

<!--- Example 10 solution -->

  <details>
    <summary><u>Výsledek: </u></summary>
<br />
{% highlight console %}
255
128
55 {% endhighlight %}

Číslo se překlopí na druhý konec intervalu a tam pokračuje. V případě prvního máme tedy povolený interval od 0 do 255 (unsigned značí, že číslo bude bez znaménka, tedy nebude možné znázornit v něm negativní hodnoty). Pokud od 0 odečteme 1, nedostaneme -1, ale 255! To samé platí u ostatních s rozdílem povoleného intervalu. V případě posledního se překlopí tolikrát, kolikrát to bude možné, než dosáhne "567".
<br /><br />
Pokud se dostanete přes povolený rozsah, jedná se o overflow. Pokud pod něho, pak se mluví o underflow.

  </details>
<br />

Snad je to takhle vše pochopitelné (a kdyby ne, klidně se mi ozvětě na [Discordu](https://discord.gg/hB8UYAgwUE)) 🙃.

## Kam dál?

{% comment %} [Smyčky a podmínky]({% post_url c/2023-08-12-smycky-a-podminky %}) {% endcomment %}
