---
layout: post
title:  "Další příklady"
date:   2024-05-02 07:00:00 +0200
last_modified_at: 2024-05-02 07:00:00 +0200
category: Programovací jazyk C
read_time: 6 min 7 s
description: Další příklady na procvičování programování v C. Opakování smyček, funkcí, printf, scanf.
permalink: programovaci-jazyk-c/dalsi-priklady
---

[Předchozí [Opakování - kalkulačka]]({% post_url c/2024-04-25-opakovani-kalkulacka %})

Určitě jsem to už jednou zmiňovala - naučit se programovat není jen a pouze o čtení textů a kódu. Pokud se opravdu chcete naučit programovat, musíte především právě programovat. I generování chyb vás posouvá dál. Naučí vás to číst v chybových hláškách, pátrat se po chybách, nebát se toho a zkoušet nové věci. A proto jsem si pro vás připravila ještě jeden příspěvek s pár příklady na procvičování.

Opět platí, že si příklady ideálně vyzkoušíte sami, než se podíváte na vzorové řešení. A stejně jako minule platí, že řešení existuje více, kódy se nikdy nebudou 100% shodovat.

## Počítání s čtyřúhelníky

Napište program, který načte od uživatele 2 čísla, která budou znázorňovat délky stran čtyřúhelníku. Následně spočítejte obvod, obsah, délku přepony a výsledek uživateli zobrazte na konzoli.

Tip: Pro výpočet délky přepony budete potřebovat Pythagorovu větu. K výsledku se dostanete pomocí odmocniny. V Céčku můžete použít knihovnu math.h - ve zdrojovém kódu ji použijete stejně jako stdio.h, program pak zkompilujete pomocí dodatku -lm:

{% highlight console %}
clang -Wall ctyruhelniky.c -lm
{% endhighlight %}

V této knihovně je hodně užitečných funkcí, v tomto příkladu využijete sqrt(). Jak se používá se můžete podívat do dokumentace.

<!-- Reseni pocitani s ctyruhelniky -->

  <details>
    <summary><u>Řešení: </u></summary>
<br />
{% highlight c %}
#include <stdio.h>
#include <math.h>

int spocitejObvod(int, int);
int spocitejObsah(int, int);
float delkaPrepony(int, int);
void printVitej();

int main(void)
{
    printVitej();

    int a, b;

    printf("Prosim zadej delky stran: ");
    scanf("%d %d", &a, &b);

    int obvod = spocitejObvod(a, b);
    int obsah = spocitejObsah(a, b);
    float prepona = delkaPrepony(a, b);

    printf("\n");
    printf("Obvod ctyruhelniku se stranami a = %d, b = %d: %d\n", a, b, obvod);
    printf("Obsah ctyruhelniku se stranami a = %d, b = %d: %d\n", a, b, obsah);
    printf("Delka prepony ctyruhelniku se stranami a = %d, b = %d: %.2f\n", a, b, prepona);

    return 0;
}

int spocitejObvod(int a, int b)
{
    return 2 * a + 2 * b;
}

int spocitejObsah(int a, int b)
{
    return a * b;
}

float delkaPrepony(int a, int b)
{
    return sqrt(a * a + b * b);
}

void printVitej()
{
    printf("--------------------------------\n");
    printf("Vitej u pocitani s ctyruhelniky!\n");
    printf("--------------------------------\n");
    printf("\n");
} {% endhighlight %}

{% highlight console %}
clang -Wall ctyruhelniky.c -lm
{% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-05-02-dalsi-priklady/ctyruhelnik.c" target="_blank">(Odkaz na GitHub)</a>
<br /><br />

Znovu připomínám, že vaše řešení se klidně může lišit. Zobrazení nějakého uvítacího textu není nutností. Stejně tak můžete mít použité jiné datové typy (dokud to alespoň trochu dává smysl a výpočty sedí). O názvech proměnných, funkcí, nebo struktuře zdrojového kódu ani nemluvím.
  </details>
<br />

## BMI kalkulačka

Tentokrát půjde o program, který si vyžádá od uživatele váhu a výšku a spočítá jeho Body Mass Index, zkráceně BMI. BMI se spočítá tak, že se váha (v kg) vydělí výškou (v m) na druhou.

Program kromě výpočtu má na konzoli vypsat i textový výsledek. Inspirovat se můžete následující tabulkou (zdroj: bodymassindex.cz):

{% include image.html url="/assets/images/c/2024-05-02-dalsi-priklady/bmi.JPG" description="https://www.bodymassindex.cz/" %}

<!-- Reseni BMI -->

  <details>
    <summary><u>BMI kalkulačka: </u></summary>
<br />
{% highlight c %}
#include <stdio.h>

float vypocetBmi(float vaha, float vyska)
{
    return vaha / (vyska / 100 * vyska / 100);
}

void vysledekKategorie(float bmi)
{
    printf("Kategorie: \n");
    if (bmi < 18.5)
    {
        printf("\tpodvaha\n");
    } else if (bmi < 24.9)  
    {
        printf("\tnorma\n");
    } else if (bmi < 29.9)
    {
        printf("\tnadvaha\n");
    } else if (bmi < 34.9)
    {
        printf("\tobezita 1. stupne\n");
    } else if (bmi < 39.9)
    {
        printf("\tobezita 2. stupne (zavazna)\n");
    } else
    {
        printf("\tobezita 3. stupne (tezka)\n");
    }
}

void vysledekZdravotniRizika(float bmi)
{
    printf("Zdravotni rizika: \n");
    if (bmi < 18.5)
    {
        printf("\tvysoka\n");
    } else if (bmi < 24.9)  
    {
        printf("\tminimalni\n");
    } else if (bmi < 29.9)
    {
        printf("\tnizka az lehce vyssi\n");
    } else if (bmi < 34.9)
    {
        printf("\tzvysena\n");
    } else if (bmi < 39.9)
    {
        printf("\tvysoka\n");
    } else
    {
        printf("\tvelmi vysoka\n");
    }
}

void vitej()
{
    printf("--------------\n");
    printf("BMI KALKULACKA\n");
    printf("--------------\n");
}

int main(void)
{
    vitej();

    float vaha;
    printf("Vaha (v kg): ");
    scanf("%f", &vaha);

    float vyska;
    printf("Vyska (v cm): ");
    scanf("%f", &vyska);

    float bmi = vypocetBmi(vaha, vyska);

    printf("BMI:\n\t%.2f\n", bmi);
    vysledekKategorie(bmi);
    vysledekZdravotniRizika(bmi);

    return 0;
} {% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-05-02-dalsi-priklady/bmi.c" target="_blank">(Odkaz na GitHub)</a>
<br /><br />

V případě nejasností nebo dotazů se mi klidně ozvěte buď tady do komentářů, nebo na <a href="https://discord.gg/hB8UYAgwUE" target="_blank">Discordu</a>.
  </details>
<br />

## Guessing Game

V této hře půjde o to uhádnout, na jaké číslo si právě myslím, resp. jaké číslo si myslí náš program. K tomu využijeme generování náhodného čísla - řádky k tomu nutné jsou následující:

{% highlight c %}
#include <time.h>
#include <stdlib.h>

int main(void)
{
    // inicializace generatoru
    srand(time(NULL));
    // cislo od 0 do 9
    int nahodne_cislo = rand() % 10;
} {% endhighlight %}

Takže nejdříve necháte program vygenerovat náhodné číslo v určitém rozmezí. Následně vyzvete uživatele k tomu, aby toto číslo zkusil uhádnout. Uživatel má tipovat tak dlouho, dokud číslo neuhádne. Kdo chce, může do odpovědí zabudovat i napovídání, např. tak, že program poradí, jestli byl tip moc malý nebo příliš velký.

<!-- Reseni guessing game -->

  <details>
    <summary><u>Řešení ke hře "Hádej číslo": </u></summary>
<br />

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void)
{
    // inicializace generatoru nahodneho cisla
    srand(time(NULL));
    // cislo od 0 do 9;
    int nahodne_cislo = rand() % 10;
    
    int tip = -1;

    printf("Hadej, na jake cislo prave myslim! (od 0 do 9)\n");

    while (1)
    {
        printf("Muj tip: ");
        scanf("%d", &tip);
        
        if (tip == nahodne_cislo)
        {
            printf("Gratuluju! Presne tohle cislo jsem mel na mysli!\n");
            break;
        } else 
        {
            if (tip < nahodne_cislo)
            {
                printf("Tesne vedle. Ale poradim ti, moje cislo je o kousek vetsi.\n");
            } else
            {
                printf("Tak vysoko jsem ani nedopocital! Zkus to jeste jednou.\n");
            }
        }
    }

    return 0;
} {% endhighlight %}

<!-- TODO -->
<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-05-02-dalsi-priklady/hadej.c" target="_blank">(Odkaz na GitHub)</a>
<br />
  </details>
<br />

## Kámen-nůžky-papír

Zkuste si naprogramovat klasiku kámen-nůžky-papír. Zamyslete se nad tím, jaké možnosti má hráč, jak nasimulujete druhého hráče (k tomu můžete využít třeba onen generátor náhodných čísel zeshora), kdy hra končí, atd. Pokud byste chtěli uživateli umožnit zadávání velkých i malých písmen, pak vám dám tip - dle ASCII jsou velká a malá písmena vždy stejně daleko od sebe; a characters, písmena jsou vlastně jenom čísla a lze s nimi počítat. Když se na tabulku podíváte a trochu poexperimentujete, určitě přijdete na to, jak zjistit, jestli je písmeno velké či malé a jak ho převést na velké nebo malé písmeno.

<!-- Reseni kamen-nůžky-papír -->

  <details>
    <summary><u>Řešení ke hře "Kámen-nůžky-papír": </u></summary>
<br />

{% highlight c %}
#include <stdio.h>

#include <stdlib.h>
#include <time.h>

int hra();
int inputHrace();
int spravnyInput(int);
int inputPocitace();
int vysledekKola(int, int);
int prevodNaVelkePismeno(int);
void oznameniViteze(int, int);

int main(void) 
{
    int hrac = 0;
    int pocitac = 0;

    printf("Povolene prikazy: K, k (kamen), N, n (nuzky), P, p (papir), Q, q (konec)\n\n");
    printf("---------------------\n");

    for (int i = 1; i <= 3; i++) 
    {
        printf("\n");
        printf("Kolo: %d\tTvoje body: %d\tBody pocitac: %d\n\n", i, hrac, pocitac);

        int kolo = hra();

        if (kolo == 'Q')
        {
            return 0;
        } else if (kolo == 1)
        {
            hrac++;
        } else if (kolo == 2)
        {
            pocitac++;
        }
    }

    oznameniViteze(hrac, pocitac);

    return 0;
}

void oznameniViteze(int hrac, int pocitac)
{
    printf("\n---------------------\n");
    printf("Konec hry!\n");
    printf("VYSLEDEK\n");
    printf("Tvoje body: %d\n", hrac);
    printf("Body pocitace: %d\n", pocitac);

    if (hrac > pocitac)
    {
        printf("Gratuluju, vyhral jsi!\n");
    } else if (hrac < pocitac)
    {
        printf("Tentokrat to nevyslo...\n");
    } else 
    {
        printf("Nerozhodne.\n");
    }
}

int hra()
{
    int volba_hrace = inputHrace();

    if (volba_hrace == 'Q' || volba_hrace == 'q') {
        return volba_hrace;
    }

    int volba_pocitace = inputPocitace();

    return vysledekKola(volba_hrace, volba_pocitace);
}

int inputHrace()
{
    printf("Jakou taktiku zvolis?\n");

    while (1)
    {
        printf("~ ");
        int volba = getchar();
        volba = prevodNaVelkePismeno(volba);
        // zkuste si vynechat toto druhe getchar() a pozorujte, co se deje
        getchar();

        if (spravnyInput(volba))
        {
            return volba;
        } else
        {
            printf("Neplatna volba!\n");
        } 
    }
}

int spravnyInput(int volba)
{
    if (volba == 'K' || volba == 'N' || volba == 'P' ||
        volba == 'Q')
        {
            return 1;
        }
    
    return 0;
}

int prevodNaVelkePismeno(int volba)
{
    if (volba >= 97 && volba <=122)
    {
        return volba - 32;
    }
    return volba;
}

int inputPocitace()
{
    // inicializace generatoru nahodneho cisla
    srand(time(NULL));
    // cislo od 0 do 9;
    int volba = rand() % 3;

    switch (volba)
    {
    case 0:
        printf("Pocitac voli kamen!\n");
        return 'K';
    case 1:
        printf("Pocitac voli nuzky!\n");
        return 'N';
    case 2:
    printf("Pocitac voli papir!\n");
        return 'P';    
    default:
        printf("Error!\n");
        break;
    }

    return -1;
}

int vysledekKola(int volba_hrace, int volba_pocitace)
{
    if (volba_hrace == volba_pocitace)
    {
        printf("Nerozhodne!\n");
        return 0;
    } else if ((volba_hrace == 'K' && volba_pocitace == 'N') ||
        (volba_hrace == 'N' && volba_pocitace == 'P') ||
        (volba_hrace == 'P' && volba_pocitace == 'K'))
    {
        printf("Vyhral jsi!\n");
        return 1;
    } else 
    {
        printf("Tohle kolo jsi prohral.\n");
        return 2;
    }
} {% endhighlight %}

<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-05-02-dalsi-priklady/kamen_nuzky_papir.c" target="_blank">(Odkaz na GitHub)</a>
<br />
  </details>
<br />

## Kam dál?

*TBD. Příště mrkneme na datová pole, anglicky arrays.*

{% comment %}[Datová pole (arrays)]({% post_url c/2023-09-21-datova-pole %}) {% endcomment %}
