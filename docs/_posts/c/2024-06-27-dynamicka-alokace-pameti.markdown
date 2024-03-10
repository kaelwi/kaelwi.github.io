---
layout: post
title:  "Dynamická alokace paměti"
date:   2024-06-27 07:00:00 +0200
last_modified_at: 2024-06-27 07:00:00 +0200
category: Programovací jazyk C
css_class: c
read_time: 3 min 40 s
description: Dynamická alokace paměti. Přehled operací. Rozložení paměti.
excerpt: Dynamická alokace paměti. Přehled operací. Rozložení paměti.
permalink: programovaci-jazyk-c/dynamicka-alokace-pameti
---

[Předchozí [Příklad - Bubble Sort]]({% post_url c/2024-06-20-priklad-bubble-sort %})

Kromě datových polí je další důležitou oblastí, kde se využívají ukazatele, dynamická alokace paměti. Do teď jsme v programu vždy konkrétně udávali, jak velké pole (nebo například textový řetězec, který je vlastně také jenom polem sestávajícím z jednotlivých písmen, ukončený tzv. null-bytem) budeme potřebovat. Co však když se rozhodneme nechat na uživateli, kolik míst v poli vlastně bude potřebovat? Nebo když se tato velikost odvíjí od jiného programu? Na takové a podobné situace se využije tzv. dynamická alokace paměti.

## Z čeho se skládá paměť

{% include image.html url="/assets/images/c/memoryLayoutC.jpg" description="Paměť v C. Zdroj: https://www.geeksforgeeks.org/memory-layout-of-c-program/" %}

Paměť se skládá mimo jiné z tzv. stacku a heapu (anglické výrazy pro zásobník a haldu), přičemž heap roste od nižšího adres nahoru a stack od vyšších dolů.

Do teď jsme pracovali se stackem. Zásobník pracuje na principu *LIFO* - last in, first out. Takto jsou například zpracovávány funkce a jejich jednotlivá volání. Nejdříve je na stack položen stack frame main funkce. V stack framu jsou uloženy proměnné, které main využívá (s tím souvisí i jejich viditelnost - normální proměnné jsou přístupné pouze v rámci vlastního stack framu, tedy pouze ve funkci či bloku, kde vznikly a jsou uloženy). Pokud z main voláme jinou funkci, dostane tato funkce vlastní stack frame v zásobníku. Jakmile je funkce ukončena, program stack frame zase zruší a vrátí se do posledního stack framu - v našem případě tedy do main.

Při načítání textu od uživatele bychom mohli tedy použít statické textové řetězce. Pole by mohlo  mít velikost pro 500 prvků a my bychom prostě doufali, že to bude stačit. Program by následně celou dobu pracoval s polem o velikosti 500 prvků - nezáleželo by na tom, zda je délka textového řetězce opravdu 499 (500 + 1 za null-byte). Nebo by naopak mohlo být pole nedostačující svou velikostí.

V takovém případě přichází na řadu dynamická alokace paměti. Dynamicky nárokujeme paměť tentokrát ne na stacku, ale v heapu.

### Krátký exkurz - typedef

V následující části uvidíte datový typ *size_t*. Tento datový typ je použit ve vícero souborech standardní knihovny jazyka C, definován je v stddef.h.

Typedef umožňuje použití vlastních jmen pro datové typy. Správná syntaxe je následující:

{% include image.html url="/assets/images/c/typedef.png" description="Syntaxe typedef" %}

Použití typedef v kombinaci s klíčovými slovy static nebo extern není povoleno. Platný příklad použití by byl na příkladu size_t:

{% highlight c %}
typedef long unsigned int size_t;
{% endhighlight %}

Ukázka nezpůsobí nic jiného, než že všude tam, kde původně v kódu stálo size_t, bude stát long unsigned int.

Výhodou je, že lze datový typ jednoduše změnit na jednom místě a změna se promítne všude tam, kde byl použit nový název. Také zlepšuje čitelnost kódu.

## Operace na heapu

{% highlight c %}
void* malloc (size_t size);
void* calloc (size_t num, size_t size);
void* realloc (void* ptr, size_t new_size);
void free (void* ptr);
{% endhighlight %}

V případě mallocu programu říkáme, že potřebujeme místo v paměti a rovnou udáváme, kolik bytů potřebujeme. Taková paměť není nijak inicializovaná, není udané, co v ní bude stát. U callocu je ten rozdíl, že udáváme počet prvků a velikost jednoho prvků v bytech. Navíc jsou taková místa v paměti inicializována nulou. Reallocem (jak název napovídá) zmenšujeme/zvětšujeme nárokovanou paměť. A free je potřeba tehdy, pokud paměť již nepotřebujeme - tímto ji uvolníme pro další použití.

### void* malloc (size_t size);

Touto funkcí rezervujeme souvislý blok v paměti o velikosti (size). Funkce vrací ukazatel na počátek tohoto bloku, který se nachází na heapu. Protože je to void-pointer, lze jej použít na jakýkoli datový typ.

Pokud by při alokaci nastala chyba, funkce by vrátila null-pointer.

Byty v paměti nejsou ničím inicializovány, není definováno, co v nich bude stát.

### void* calloc (size_t num, size_t size);

Touto funkcí rezervujeme souvislý blok v paměti o velikosti (num \* size). I tato funkce vraí ukazatel na počátek bloku na heapu a null-pointer v případě chyby při alokaci. Jednotlivé byty bloku jsou inicializovány nulou.

### void* realloc (void* ptr, size_t new_size);

Blok v paměti lze o *new_size* zvětšit nebo zmenšit. Podle možností je navrácen buď původní blok (pozměněný o new_size), nebo blok úplně nový. Stávající data jsou převzata do nového bloku v paměti, obsah bytů navíc není definován. I zde je vrácen null-pointer, pokud by došlo k problémům při alokaci.

### void free (void* ptr);

Pomocí free uvolňujeme dynamicky alokovanou paměť. Při každém ukončení programu je sice uvolňována paměť na stacku, ne však na heapu. O toto se musí v C postarat programátor sám, aby nedocházelo k tzv. memory leaks, [únikům paměti](https://cs.wikipedia.org/wiki/%C3%9Anik_pam%C4%9Bti).

## Shrnutí

Relevantní funkce:
- void* malloc(size_t size);
- void* calloc(size_t count, size_t size);
- void* realloc(void* ptr, size_t size);
- void free(void *ptr);

Pro jejich používání je třeba na začátku souboru mít vložen stdlib.h.

Z dnešního článku si zapamatuj, že paměť je možné nárokovat dynamicky z heapu. Takto nárokovaná paměť musí být zase uvolněna, když už není potřebná (pomocí free). Data, která máme na stacku, není třeba explicitně uvolnit.

## Kam dál?

*\-TBD\-*

{% comment %} [Enum a Struct]({% post_url c/2024-07-04-enums-structs %}) {% endcomment %}
