---
layout: post
title:  "Textové řetězce (strings)"
date:   2024-05-16 07:00:00 +0200
last_modified_at: 2024-05-16 07:00:00 +0200
category: Programovací jazyk C
css_class: c
read_time: 1 min 29 s
description: Textové řetězce (angl. strings) v programovacím jazyce C. Struktury pro ukládání textu.
excerpt: Textové řetězce (angl. strings) v programovacím jazyce C. Struktury pro ukládání textu.
permalink: programovaci-jazyk-c/textove-retezce
---

[Předchozí [Datová pole (arrays)]]({% post_url c/2024-05-09-datova-pole %})

Doteď jsme se zabývali jednoduchými datovými typy, případně jejich sloučením do datového pole. Poznali jsme celočíselné proměnné, proměnné držící desetinné číslo, char (pro písmena) a void.

Jazyk C (na rozdíl od mnoha jiných programovacích jazyků) nenabízí automaticky typ *string*. Ale poněvadž už umíme pracovat s datovými poli, aneb poli, která slučují data stejného typu, pak si s chybějícím textovým řetězcem hravě poradíme. Vždyť text není nic jiného než uskupení písmenek - v Céčku tedy datové pole držící náš text ve formě jednotlivých písmenek.

Konec textového řetězce značí v Céčku tzv. null-byte, *'\0'*.

Následuje ukázka toho, jak by mohl takový řetězec v kódu vypadat:

{% highlight c %}
char text1[5] = { 'A', 'h', 'o', 'j', '\0' };
char text2[5] = "Ahoj";     // compiler nam na konec automaticky da '\0'
char text3[] = "Ahoj";      // i zde lze vynechat velikost pole - je znama pres pocet prvku
{% endhighlight %}

Nyní už jsme schopní si od uživatele vyžádat i jeho jméno. Zkuste nyní použít funkci fgets(); potřebné informace k ní najdete přes *man fgets* (v příkazovém řádku).

{% highlight c %}
#include <stdio.h>

#define MAX 15

int main(void)
{
    char jmeno[MAX];

    printf("Jmeno: ");
    fgets(jmeno, MAX, stdin);

    printf("Zadane jmeno: %s", jmeno);

    return 0;
} {% endhighlight %}

Maximální délku jména jsem limitovala na 15. Toto číslo jsem definovala jako konstantu (celkem nahoře pomocí *#define MAX 15*).

Pokud byste se chtěli podívat, co se nachází na jednotlivých místech proměnné "jmeno", pak si je můžete nechat vytisknout opět pomocí smyčky. Ideálně jako čísla, abyste viděli i netisknutelné znaky. Překlad mezi čísly a znaky pak najdete v ASCII tabulce.

{% highlight c %}
#include <stdio.h>

#define MAX 15

int main(void)
{
    char jmeno[MAX];

    printf("Jmeno: ");
    fgets(jmeno, MAX, stdin);

    printf("Zadane jmeno: %s", jmeno);

    printf("Znaky v poli 'jmeno': \n");

    for (int znak = 0; znak < MAX; znak++)
    {
        printf("%d ", jmeno[znak]);
    }
    printf("\n");

    return 0;
} {% endhighlight %}

([Odkaz na GitHub](https://github.com/kaelwi/kaelwi-c/blob/master/2024-05-16-textove-retezce/textove-retezce.c){:target="_blank"})

Všimněte si, že ať už zadáte jakékoli jméno, končí novým řádkem (\n, nebo 10) a null bytem (0). Cokoli potom jsou nedefinované hodnoty, hodnoty, které v paměti už byly.

## Kam dál?

{% comment %} [Argumenty předané programu z příkazového řádku]({% post_url c/2024-05-23-argumenty-z-prikazoveho-radku %}) {% endcomment %}
