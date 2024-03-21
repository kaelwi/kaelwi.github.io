---
layout: post
title:  "První program, datové typy a printf"
date:   2024-03-14 07:00:00 +0200
last_modified_at: 2024-03-14 07:00:00 +0200
category: Programovací jazyk C
css_class: c
read_time: 6 min 6 s
description: Rozbor zdrojového kódu v jazyce C. Komentáře, printf, main, příkazy pro preprocesor, whitespaces. Proměnné, datové typy, modifier. Pravdivostní hodnoty.
excerpt: Rozbor zdrojového kódu v jazyce C. Komentáře, printf, main, příkazy pro preprocesor, whitespaces. Proměnné, datové typy, modifier. Pravdivostní hodnoty.
permalink: programovaci-jazyk-c/prvni-program-datove-typy-a-printf
---

[Předchozí [Úvod do programování v jazyce C]]({% post_url c/2024-03-07-uvod-do-programovani-v-jazyce-c %})

V minulém díle jsme si ukázali nástroje, které budeme k programování využívat a napsali, zkompilovali a spustili první program. Nyní vám povím ještě něco málo k teorii, stavbě takového programu a dáme si lehký úvod do datových typů.

## Program psaný v jazyce C

Už jsem to zmínila minule, ale pokud budete psát programy, zkuste je psát od počátku v angličtině (pokud angličtinu ovládáte). Angličtina je jazyk, který se v IT světě používá, protože nikdy nevíte, kdo se bude chtít na váš program mrknout, z kterého koutu světa bude.

### Komentáře

Dále jsou pro většinu programů důležité komentáře. Zde se nejenom hledí na to, že váš program možná bude chtít rozluštit někdo jiný, ale také pro vás můžou být důležité. Z vlastní zkušenosti vím, že když se na kód (hlavně pokud už se třeba jedná o něco komplikovanějšího) podíváte za 3, 6 nebo třeba 12 měsíců, budete rádi, když tam sem tam najdete nějaké vysvětlivky v podobě komentářů.

Komentáře jsou části ve zdrojovém kódu, které kompilátor při své práci překladu bude ignorovat. Můžete tam tedy napsat, co se vám zlíbí.

V jazyce C existují dva typy komentářů. Tzv. block comment a line comment.

{% highlight c %}
// This is a line comment.
/* This is
a block
comment */

// And another line comment.
{% endhighlight %}

Line comment (značený // na začátku řádku), jak už název napovídá, vytvoří jenom z toho jednoho řádku komentář. Block comment začíná /* a končí až s */. Oba typy vidíte výše.

S komentáři by náš hi.c mohl vypadat třeba následovně:

{% highlight c %}
/* Simple program that outputs hi on the console.
 * 
 * Author: K. Wild
 * Date: 14.03.2024
 */
#include <stdio.h>
int main(void) {
  printf("hi");
  return 0;
}
{% endhighlight %}

### Použití whitespaces

U tohoto prográmku ještě chvíli zůstaneme. Všimněte si, že každý příkaz začíná na novém řádku (v angličtině se říká, že každý příkaz končí s *newline*). Není to ale nezbytně nutnost. Speciální příkazy, jako například ten první *#include <stdio.h>*, takto musí být ukončené. Ostatní byste mohli napsat klidně za sebou a kompilátor by si nestěžoval a svoji práci odvedl stejně jako předtím. Myslete ale v takových případech opět na čitelnost kódu a tzv. *whitespaces* (mezi něž patří i newline nebo např. odsazení) spíše používejte.

Stále funkční hi.c (klidně zkopírujte a vyzkoušejte):

{% highlight c %}
/* Simple program that outputs hi on the console.
 * 
 * Author: K. Wild
 * Date: 14.03.2024
 */
#include <stdio.h>
int main(void) {printf("hi");return 0;}
{% endhighlight %}

(Program výše naleznete i na GitHubu pod [tímto odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-14-prvni-program-datove-typy-a-printf/hi.c){:target="_blank"}).

### Instrukce pro preprocesor

Když už jsem zmínila první příkaz, náš include v tomto případě, ve zkratce vám i povím, k čemu slouží. Tento příkaz zjednoduššeně vyhledá a vloží do vašeho kódu kód ze souboru, který definujete v těch ostrých závorkách. My vkládáme *stdio.h*, které nám dává možnost využít funkci *printf*. Stdio je zkratka pro *standard input output*, neboli standardní vstup a výstup. Celé to zpracovává tzv. preprocesor.

### Funkce printf

Funkce printf je tzv. polymorfní funkce, což znamená, že může přijmout libovolný počet parametrů (parametr funkce je to, co funkci předáte v závorce, my jsme nahoře předali textový řetězec "hi"). První parametr je tzv. format string, který může obsahovat zástupné symboly, které jsou následně v textovém řetězci nahrazeny tím, co přidáte na místě dalších parametrů.

Mezi nejdůležitější zástupné symboly paří:
- %d (celé číslo, se znaménkem, int)
- %u (celé číslo, bez znaménka, unsigned int)
- %f (desetinné číslo, float nebo double)
- %c (znak, char)
- %s (textový řetězec, string)
- %% (znaménko %)

Podrobný popis této funkce najdete přes Google nebo příkazový řádek následujícím příkazem:

```console
man 3 printf
```

### Funkce main

Nezbytnou součástí C programu je funkce **main**. Značí vstup, počátek. K funkcím se ještě určitě dostaneme, prozatím jen krátké povídání o této hlavní funkci. Klíčové slovo (*keyword*) *int* na začátku udává, co bude funkce vracet (všimněte si příkazu *return 0;* na konci). Int je zkratka pro *integer*, což značí celočíselnou hodnotu. Za každou funkcí je závorka, do které je možné udat parametry, které je možné ve funkci použít; *void* znamená prázdný a v tomto případě pouze zdůrazňuje, že funkce main žádné parametry nemá. Blok, nebo tělo funkce je ohraničeno složenými závorkami ({}).

Bloky jsou tedy ohraničeny složenými závorkami, příkazy pro preprocesor začínají hashtagem (#), každý jiný příkaz je ukončen středníkem.

## Proměnné

Proměnné představují symbolické názvy pro místa v paměti. Předtím, než proměnnou můžete použít, musíte ji definovat. Název může být libovolně dlouhý a může sestávat z písmen, číslic a podtržítka (_). Název nesmí začínat číslicí a nesmí být stejný jako jedno z rezervovaných klíčových slov (jako např. nahoře zmíněný int nebo return). Pozor, při používání záleží na psaní velkých / malých písmen, tzn. counter není to samé jako Counter.

## Datové typy

V programovacím jazyku C existují různé datové typy. Takové typy určují, kolik paměti bude zabráno a také určují chování a proveditelnost operací na těchto typech.

Následující datové typy známe v C:
- int (celé číslo)
- float (desetinné číslo)
- double (desetinné číslo s větší přesností)
- char (znak)
- void (žádná (nebo libovolná) data)

### Modifier

Výše zmíněné datové typy je ještě možné upravit následujícími klíčovými slovy:
- signed (se znaménkem, tzn. +/-)
- unsigned (pouze pozitivní čísla)
- short (velikost okupované paměti není na všech systémech stejná, ale musí být zaručeno, že int nebude menší než short)
- long (velikost okupované paměti není na všech systémech stejná, ale musí být zaručeno, že long nebude menší než int)

S velikostí okupované paměti souvisí i to, jak velké číslo může vaše proměnná pojmout. 

Podobné platí i pro použití znaménka. Proměnná definovaná jako unsigned int může např. odkazovat na číslo v rozmezí 0 až 65535, signed int pak na číslo v rozmezí −32767 až +32767.

Následující program vám zobrazí velikost okupované paměti a rozmezí jednotlivých datových typů.

{% highlight c %}
/*
 * Data types and their size
 *
 * Author: K. Wild
 * Date: 14.03.2024
 */

#include <stdio.h>
// get ranges
#include <limits.h>

// check ASCII table for more info
char char_value = '\0'; 
int int_value;
short short_value = 0;
long long_value = 0;
long long long_long_value = 0;
float float_value = 0.0f;
double double_value = 0.0;
long double long_double_value = 0.0;

int main(void) 
{
  int_value = 0;
  printf("Size of char:		%2lu byte(s)\n", sizeof char_value);
  printf("Range of signed char: %d to %d\n", SCHAR_MIN, SCHAR_MAX);
  printf("Range of unsigned char: 0 to %d\n\n", UCHAR_MAX);
  printf("Size of int:		%2lu byte(s)\n", sizeof int_value);
  printf("Range of signed int: %d to %d\n", INT_MIN, INT_MAX);
  printf("Range of unsigned int: 0 to %u\n\n", UINT_MAX);
  printf("Size of short:	%2lu byte(s)\n", sizeof short_value);
  printf("Range of signed short int: %d to %d\n", SHRT_MIN, SHRT_MAX);
  printf("Range of unsigned short int: 0 to %d\n\n", USHRT_MAX);
  printf("Size of long:		%2lu byte(s)\n", sizeof long_value);
  printf("Range of signed long int: %ld to %ld\n", LONG_MIN, LONG_MAX);
  printf("Range of unsigned long int: 0 to %lu\n\n", ULONG_MAX);
  printf("Size of long long:	%2lu byte(s)\n", sizeof long_long_value);
  printf("Size of float:	%2lu byte(s)\n", sizeof float_value);
  printf("Size of double:	%2lu byte(s)\n", sizeof double_value);
  printf("Size of long double:	%2lu byte(s)\n", sizeof long_double_value);
  return 0;
}
{% endhighlight %}

(Program výše naleznete i na GitHubu pod [tímto odkazem](https://github.com/kaelwi/kaelwi-c/blob/master/2024-03-14-prvni-program-datove-typy-a-printf/datatypes.c){:target="_blank"}).

Všimněte si další include direktivy. S pomocí limits.h jsme schopni použít SCHAR_MIN a další.

Také zde vidíte, že používáme funkci printf s různým počtem parametrů. První parametr tvoří tzv. format string, ve kterém jsou použity tzv. zástupné symboly (začínají procentem), na jejichž místo je v textu dosažena hodnota obsažená v dalších parametrech. Jednotlivé parametry jsou odděleny čárkou. Výstup je možné i formátovat. %2lu znamená formátování datového typu long unsigned na 2 číselná místa.

Druhá proměnná (int_value) je na začátku pouze deklarovaná, není inicializovaná. Bude tam hodnota 'undefined'! Céčko se snaží být efektivním programovacím jazykem a neudělá nic víc, než co mu povíte. Žádná default hodnota se tam tedy neskrývá (v jiných jazycích se můžete setkat s tím, že tam bude např. hodnota 0). Proto je lepší proměnné ihned inicializovat.

Datový typ *char* může obsahovat znaky i čísla. Pro porovnání se mrkněte do ASCII tabulky (Google). Např. znak mezery by měl hodnotu 32. Znak, který je použit nahoře ('\0') není stejný jako znak nuly ('0'). A znak shora bude mít hodnotu 0, zatímco znak '0' bude mít hodnotu 48. Zní to možná zmatečně, ale časem na to přijdete. Prozatím můžete mrknout do zmiňované tabulky a znaky si i nechat vydat na konzoli (např. dopsáním následujících 2 řádků do výše ukázaného programu těsně před return).

{% highlight c %}
int main(void) {
  // ...
  printf("%d\n", char_value);
  printf("%d\n", '0');
  return 0;    
}
{% endhighlight %}

Pro úplnost ještě zmínka k \n - znamená *newline* a značí nový řádek. Tzn. jako byste ve wordu hodili Enter.

### Pravdivostní hodnoty

V programovacím jazyce C lze jakoukoli proměnnou interpretovat jako pravdivostní hodnotu (v AJ *bool* nebo *Boolean*). Hodnota 0 pak znamená nepravdu a jakákoli jiná hodnota (včetně záporných čísel) pravdu.

Od standardu C99 lze používat datový typ _Bool (díky #include <stdbool.h>) a s ním mj. přicházejícími makry true (pravda) a false (nepravda).

## Kam dál?

[Operátory v C]({% post_url c/2024-03-21-operatory-v-c %})
