---
layout: post
title:  "Příklad - Bubble Sort"
date:   2024-06-20 07:00:00 +0200
last_modified_at: 2024-06-20 07:00:00 +0200
category: Programovací jazyk C
css_class: c
read_time: 1 min 14 s
description: Příklad na procvičování aritmetiky ukazatelů. Implementace bublinkového řazení.
excerpt: Příklad na procvičování aritmetiky ukazatelů. Implementace bublinkového řazení.
permalink: programovaci-jazyk-c/priklad-bubble-sort
---

[Předchozí [Pointer (ukazatel)]]({% post_url c/2024-06-13-pointer %})

Oblíbené příklady na procvičování pointerů a aritmetiky s nimi jsou implementace algoritmů k řazení prvků. Jedním ze známějších je tzv. bubble sort, neboli bublinkové řazení.

Bubble sort je celkem hezky popsaný v angličtině na [GeeksforGeeks](https://www.geeksforgeeks.org/bubble-sort/){:target="_blank"}, případně v češtině na [Wikipedii](https://cs.wikipedia.org/wiki/Bublinkov%C3%A9_%C5%99azen%C3%AD){:target="_blank"}.

Bubble sort prochází seznam a porovnává dva sousedící prvky. Pokud nejsou ve správném pořadí, pak je prohodí. Toto pak dělá tak dlouho, dokud není celý seznam seřazený. Pro pseudocode mrkni právě na onu výše zmíněnou Wikipedii, kde je i ukázka algorithmu hezky animovaná.

Napsání kódu není samo o sobě nijak složité. Tentokrát jde o to pochopit problém, bez čehož by nebylo vůbec možné nějaký program napsat.

Pro srovnání, zde možné
  <details>
    <summary><u>Řešení:</u></summary>
<br />
{% highlight c %}
#include<stdio.h>

#define VELIKOST_POLE 5

void vytiskniPole(int* pole, int size)
{
  for (int i = 0; i < size; i++)
  {
    printf("[%2d] ", *(pole+i));
  }
  printf("\n");
}

void zamena(int* a, int* b)
{
  int tmp = *a;
  *a = *b;
  *b = tmp;
}

void bubbleSort(int* pole, int size)
{
  int serazeno = 1;
  do{
    serazeno = 1;

    for (int i = 0; i < size - 1; i++)
    {
      if (pole[i] > pole[i+1])
      {
        zamena(pole + i, pole + i + 1);
        serazeno = 0;
      }
    }
  } while(serazeno != 1);  
}

int main(void)
{
  int pole[VELIKOST_POLE] = { 12, 11, 13, 5, 6 };
  vytiskniPole(pole, VELIKOST_POLE);
  bubbleSort(pole, VELIKOST_POLE);
  vytiskniPole(pole, VELIKOST_POLE);

  return 0;
} {% endhighlight %}

(<a href="https://github.com/kaelwi/kaelwi-c/blob/master/2024-06-20-priklad-bubble-sort/bubblesort.c" target="_blank">Odkaz na GitHub</a>)
<br /><br />

</details>
<br />

## Kam dál?

{% comment %} [Dynamická alokace paměti]({% post_url c/2024-06-27-dynamicka-alokace-pameti %}) {% endcomment %}
