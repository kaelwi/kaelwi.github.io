---
layout: post
title:  "Argumenty předané programu z příkazového řádku"
date:   2024-05-23 07:00:00 +0200
last_modified_at: 2024-05-23 07:00:00 +0200
category: Programovací jazyk C
css_class: c
read_time: 1 min 56 s
description: Spuštení programu s argumenty a jejich načtení a použití v kódu.
permalink: programovaci-jazyk-c/cmd-args
---

[Předchozí [Textové řetězce (strings)]]({% post_url c/2024-05-16-textove-retezce %})

Program lze spustit přes příkazový řádek s dodatečnými argumenty. Doteď jsme program spouštěli tak, že jsme do příkazového řádku napsali název po kompilaci. Zkompilování a spuštění tedy vypadalo např. následovně:

{% highlight console %}
clang -Wall test.c -o test
./test
{% endhighlight %}

Prvním příkazem jsme náš céčkový soubor zkompilovali do souboru test, který jsme následně spustili příkazem ./test.

Programu je však možné předat při spuštění nějaké argumenty, informace, se kterými může následně pracovat. Takové argumenty jsou oddělené mezerami a prvním argumentem je vždy název programu (tedy ./test výše). 

Doposud byla naše main s návratovým typem int a neměla žádné parametry, do závorky za název jsme psali void. Funkce main však může mít parametry, které následně dostane ve formě argumentů příkazového řádku. Tyto parametry pak jsou int argc a char* argv[]. První je tzv. argument counter, který udává počet argumentů, které program dostal při spuštění, a druhý je tzv. argument vector, který obsahuje ony argumenty (první je ./test, spuštění programu).

V příkladu níže jsou použity \*, které značí ukazatele. K těm se teprve dostaneme, zatím si z nich nijak víc hlavu dělat nemusíte. Jde o to, že main dostane argumenty ve formě datového pole sestávajícího z char-ukazatelů (char\*) a v kódu se od nás tedy také očekává, že tyto argumenty uložíme do proměnné s odpovídajícím typem. A protože tedy pracujeme s ukazatelem, měníme samotnou proměnnou, nejenom její kopii (a tedy ani nic nemusíme vracet). Ale to je jen odbočka, k ukazatelům se ještě dostaneme obšírněji. Dole jde hlavně o to, abyste viděli, že jde program spustit s dodatečnými argumenty a je možné s nimi pracovat. Hlavně si pamatujte, jak má vypadat parameter list main, pokud potřebujete vypreparovat argumenty.

Následující program nedělá nic jiného, než že očekává 2 argumenty (jeden pro název programu, druhý tedy jako opravdu už extra argument) a následně je vydá na konzoli.

{% highlight c %}
#include <stdio.h>

int main(int argc, char* argv[])
{
  if (argc != 2)
  {
    printf("Spust prosim program a udej pritom sve jmeno.\n");
    return -1;
  }

  char* program = argv[0];
  char* jmeno = argv[1];

  printf("Vitej, %s!\n", jmeno);
  printf("Nazev programu: %s\n", program);
  
  return 0;
}
{% endhighlight %}

Pokud ho zkompilujete a spustíte jako já:

{% highlight console %}
clang -Wall cmd-args.c -o cmd-args
./cmd-args Karoline
{% endhighlight %}

Pak vám na konzoli vyjede:

{% highlight console %}
Vitej, Karoline!
Nazev programu: ./cmd-args
{% endhighlight %}

([Odkaz na GitHub](https://github.com/wild-karoline/C/blob/main/12-cmd-args/cmd-args.c){:target="_blank"})

Programu můžete předávat i jiný počet argumentů, jde o to, aby jednotlivé argumenty byly odděleny mezerou. Také to nemusí být jen a pouze slova (i když je tak program bude vnímat, pro převod na čísla ale existují funkce).

Tak si s tím klidně pohrajte a zkoušejte. Předávání argumentů programu je oblíbené a hojně využívaná záležitost.

## Kam dál?

{% comment %} [Strings - příklady]({% post_url c/2023-10-02-strings-priklady %}) {% endcomment %}
