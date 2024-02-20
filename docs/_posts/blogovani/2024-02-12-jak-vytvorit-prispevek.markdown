---
layout: post
title:  "Jak  vytvořit příspěvek na blog"
date:   2024-02-12 07:00:00 +0200
last_modified_at: 2024-02-12 11:20:00 +0200
category: Blogování
read_time: 1 min 41 s
description: Úvod do blogování s Jekyllem. Třetí díl blogování zdarma - vytvoření nového příspěvku, jeho základní nastavení (front matter), název a umístění a proměnné.
excerpt: Úvod do blogování s Jekyllem. Třetí díl blogování zdarma - vytvoření nového příspěvku, jeho základní nastavení (front matter), název a umístění a proměnné.
permalink: blogovani/jak-vytvorit-prispevek-na-blog
---

[Předchozí [Základní konfigurace blogu]]({% post_url blogovani/2024-02-08-zakladni-konfigurace-blogu %})

Základní kostru blogu a jeho konfiguraci jsme si vytvořili v minulých dílech. Nyní se pojďme podívat na to, jak se s Jekyllem vytváří nové příspěvky.

Příspěvky se v Jekyllu píšou ve značkovacím jazyku *Markdown*. Nelekejte se, není to žádná věda. Jekyll vám na začátku vygeneroval příklad příspěvku, jehož obsah můžete pro začátek zkopírovat a upravit. Samozřejmě se můžete inspirovat i u mě a pokud se vám nějaká funkcionalita nebo zobrazení líbí, neváhejte navštívit [repositář na GitHubu](https://github.com/kaelwi/kaelwi.github.io){:target="_blank"} a mrknout, jak jsem to vyřešila v MARKUPu.

## Název a umístění souboru s textem příspěvku

Důležité je zmínit, že váš text musí být psán v souboru s pevně daným názvem, aby ho Jekyll rozpoznal a přetvořil v příspěvek na blogu. Soubor pak musí být uložen ve složce *_posts*.

Název souboru musí mít následující formát:

{% highlight console %}
ROK-MESIC-DEN-nazev-prispevku.markdown
{% endhighlight %}

- ROK ve formě 4 čísel, měsíc a den 2

Například:

{% highlight console %}
2023-06-28-jak-vytvorit-prispevek.markdown
2023-06-24-jak-zalozit-blog.markdown
{% endhighlight %}

## Front Matter

Každý soubor s novým příspěvkem musí začínat tzv. *front matter*, kterým určujeme použité rozvržení (layout), případně další metadata. Samozřejmě může být i prázdný. První řádky souboru tedy můžou vypadat například následovně:

{% highlight yaml %}
---
layout: post
title:  "Jak  vytvořit příspěvek na blog"
categories: Blogování
---
{% endhighlight %}

- layout udává, jaké rozložení má být použito pro tento příspěvek
  - html soubor k tomu naleznete mezi soubory šablony, kterou používáte (viz minulý díl)
- title značí název příspěvku, který je Jekyllem přetvořen v h1 tag (hlavní nadpis stránky)
- categories umožňuje podobně jako tags shlukovat příspěvky do kategorií

Již jsme viděli, že na proměnné ze souboru _config.yml je možné odkazovat přes site.*nazev_promenne*. Podobně je tomu u proměnných definovaných na počátku příspěvku, s tím rozdílem, že se na ně odkazuje přes page (tzn. *page.nazev_promenne*). Pokud byste tedy potřebovali v layoutu odkázat na kategorie (např. ve smyčce, for loop), udělali byste to přes *page.categories*.

## Kam dál?

{% comment %} *TBD. V příštím díle se konečně podíváme na to, jak blog zveřejnit! Hurá, půjdeme online 😎. Příspěvek očekávej ve čtvrtek 15.2.2024.* {% endcomment %}

[Jak zveřejnit blog]({% post_url blogovani/2024-02-15-jak-zverejnit-blog %})
