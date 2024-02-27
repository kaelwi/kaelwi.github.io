---
layout: post
title:  "Úpravy provedené na šabloně"
date:   2024-03-11 07:00:00 +0200
last_modified_at: 2024-03-11 07:00:00 +0200
category: Blogování
css_class: blogovani
read_time: 3 min 14 s
description: Možná už si tu nějaké pozorné oko všimlo úprav a odchylek od původní šablony (Minima v mém případě). Dneska zde shrnu, co a jak jsem kde změnila v původní šabloně.
excerpt: Možná už si tu nějaké pozorné oko všimlo úprav a odchylek od původní šablony (Minima v mém případě). Dneska zde shrnu, co a jak jsem kde změnila v původní šabloně.
permalink: blogovani/upravy-minimy
---

[Předchozí [Indexování Googlem]]({% post_url blogovani/2024-03-04-indexovani-googlem %})

Možná už si tu nějaké pozorné oko všimlo úprav a odchylek od původní šablony (Minima v mém případě). Dneska zde shrnu, co a jak jsem kde změnila v původní šabloně.

Připomínám, že soubory šablony najdete pomocí následujícího příkazu:

```console
bundle info --path minima
```

Kdo si neví rady, kde a jak příkaz provést, mrkne prosím [zde](https://kaelwi.github.io/blogovani/jak-zalozit-blog#příkazový-řádek) (nebo na Google).

## Home

Soubor *home.html* jsem našla ve složce *_layouts*. Aby bylo možné soubor upravit a Jekyllu následně vnutit ten vlastní upravený soubor, je třeba ho mít pod stejným názvem a ve stejné složce i u sebe v projektu. *home.html* jsem si tedy zkopírovala k sobě do *docs/_layouts/*.

Píšu v češtině a proto jsem i na hlavní stránce chtěla mít seznam příspěvků, ne postů. Takže jsem přesně tohle udělala v souboru pro domovskou stránku - místo *default: "Posts"* tam teď mám *default: "Příspěvky"*. Soubor není příliš obsáhlý, určitě najdete příslušnou pasáž.

Také jsem chtěla, aby se vedle data a kategorie zobrazoval i čas čtení a také, aby kategorie byla ve formě odkazu na příslušnou část v obsahu, který jsem vytvořila (viz [Jak vytvořit obsah podle kategorií]({% post_url blogovani/2024-02-22-jak-vytvorit-obsah-podle-kategorii %})). Čas čtení jsem přidala jednoduchým zkopírováním span-elementů, které už tam byly, akorát jako text se mělo zobrazovat to, co se skrývá za proměnnou *read_time*, kterou jsem poctivě používala u každého příspěvku. Odkaz se v html (a to, co se nachází v home.html pod front matter (obsah mezi pomlčkami) je právě html) udává pomocí elementu *a* a jeho atributu *href*. Vyřešila jsem odkaz následovně:

{% highlight html %}{% raw %}
<a href="obsah.html#{{ post.category | replace: ' ', '_' }}">{{ post.category }}</a>
{% endraw %}{% endhighlight %}

Skoro na konci *home* je pak část odkazující na *site.show_excerpts* a *post.excerpt*. Pokud chcete, aby se vám na domovské stránce zobrazoval nejen seznam příspěvků, ale i krátký popisek/výcuc každého příspěvku, pak je třeba v *_config.yml* přidat *show_excerpts: true* a pak u každého příspěvku ve front matter přidat popis za tag *excerpt* (podobně jako je to s description, title, date, nebo třeba kategorií).

## Post

I v rozvržení příspěvků jsem provedla nějaké úpravy. Za prvé jsem chtěla mít nahoře obsah a pak jsem také chtěla mít u každého nadpisu možnost dostat se jedním kliknutím zpátky nahoru. A u časových údajů (vytvořeno a naposledy upraveno) jsem přidala popisek údajů, tedy "Publikováno:" a "Naposledy upraveno:".

Následuje popis toho, jak vytvořit menu a tlačítko "Nahoru". Upozorňuji, že se jedná o popis JavaScriptového řešení! Pokud je to na tebe příliš španělská vesnice, nelam si tím hlavu. Můžeš si samozřejmě kód prohlédnout a zkusit ho metodou copy/paste dostat k sobě. Tady je [odkaz](https://github.com/kaelwi/kaelwi.github.io/blob/master/docs/_posts/blogovani/2024-03-11-upravy-minimy.markdown).

Tlačítka jsem vytvořila pomocí JavaScriptu (vše mezi <script> a </script>).

Tlačítko "nahoru" vzniklo tak, že jsem si za pomocí JS našla všechny podnadpisy v textu (ve funkci *upButton()* hned na začátku *querySelectorAll*). A také hlavní nadpis, ke kterému se chci vracet. No a pak jsem pro každý z těch podnadpisů vytvořila tlačítko, resp. odkaz, který vede k hlavnímu nadpisu. Odkaz jsem do stávající stránky vložila pomocí *insertBefore*.

Obsah netvořím, pokud je jediným podnadpisem část "Kam dál". Pokud příspěvek obsahuje více částí, pak obsah tvořím tak, jak je vidět v kódu. Pokud se v JS vyznáš, určitě si poradíš. Pokud ne, nevadí, ale rozepisovat to tu teď nebudu, to by bylo na dlouho.

Vzhled obsahu u příspěvku je dán v souboru main.scss (ve složce assets). Odkaz k mé verzi [zde](https://github.com/kaelwi/kaelwi.github.io/blob/master/docs/assets/main.scss). Využila jsem pro zarovnání flexbox, zrušila puntíky u seznamu. Přístup k jednotlivým elementům jsem si zajistila přes tzv. css selektory. To tak pár slovíček, kdyby se někdo chtěl podívat podrobněji (Google).

## Obrázky

Chtěla jsem mít u každého obrázku možnost popisku. Radu a pomoc jsem našla přes Google na [stackoverflow](https://stackoverflow.com/questions/19331362/using-an-image-caption-in-markdown-jekyll).

Do složky *_includes* jsem tedy vložila soubor *image.html* s následujícím obsahem:

{% highlight html %}{% raw %}
<figure class="image">
    <img src="{{ include.url }}" alt="{{ include.description }}">
    <figcaption>{{ include.description }}</figcaption>
</figure>
{% endraw %}{% endhighlight %}

Vkládání obrázku u příspěvku pak vypadá třeba takto:

{% highlight html %}{% raw %}
{% include image.html url="/assets/images/albanie/saranda/saranda-bistrica-beach.jpg" description="Saranda, Bistrica beach" %}
{% endraw %}{% endhighlight %}

A výsledný obrázek:

{% include image.html url="/assets/images/albanie/saranda/saranda-bistrica-beach.jpg" description="Saranda, Bistrica beach" %}

## Footer

V záhlaví jsem úplně zrušila nadpis (podle Minimy by to byl site.title) a tagline. Ani jedno jsem nepociťovala jako důležité tam dole a tagline jsem stejně nepoužívala a jeho přítomnost (i když byl prázdný) mi akorát rozhodila zarovnání site.description. Kdyžtak mrk na soubor [zde](https://github.com/kaelwi/kaelwi.github.io/blob/master/docs/_includes/footer.html).

Také jsem měla nějak rozhozené social media ikony. Po kontrole přes devtools (když na stránku klikneš pravým tlačítkem a dáš *Inspect*, tak se tam dostaneš) jsem zjistila, že social media má padding shora 5px. 

*TODO*
