---
layout: post
title:  "Jak vytvořit obsah podle kategorií"
date:   2024-02-22 07:00:00 +0200
last_modified_at: 2024-02-22 07:00:00 +0200
category: Blogování
read_time: 4 min 47 s
description: Návod, jak vytvořit na Jekyll blogu stránku s výčtem kategorií a jim přiřazených článků.
excerpt: Návod, jak vytvořit na Jekyll blogu stránku s výčtem kategorií a jim přiřazených článků.
permalink: blogovani/jak-vytvorit-obsah-podle-kategorii
---

[Předchozí [Příspěvek se nezobrazuje?]]({% post_url blogovani/2024-02-19-prispevek-se-nezobrazuje %})

Pokud jste si všimli, že na blogu mám vedle stránky "About" i stránku "Obsah" a zajímá vás, jak jsem ji vytvořila, jste tu správně. Můj obsah představuje výčet příspěvků seřazených podle kategorií. A protože nebudu po každém vytvořeném příspěvku upravovat i tuto stránku, vytvořila jsem si tzv. *layout*, který mi obsah generuje/plní automaticky.

Jestli si vzpomínáte, tak pro layouty (mimo jiné) má šablona Minima vlastní složku. A pokud se rozhodnete cokoli od Minimy upravit nebo doplnit, musíte si mezi vlastními soubory vytvořit složku s totožným názvem. Takže tím začneme. Vytvořte si složku s názvem *_layouts* (pozor, všimněte si podtržítka na začátku) na stejné úrovni, jako je i složka _posts. V této složce pak vytvořte HTML soubor, do kterého vložíte kód pro generování seznamu příspěvků. Můj se jmenuje *categories.html*.

Jekyll využívá vedle MARKUP, HTML i tzv. [Liquid](https://shopify.github.io/liquid/){:target="_blank"}. Tyto jazyky je možné kombinovat v rámci jediného souboru, my v layoutu využijeme kombinaci Liquidu a HTML.

Ale začněte tím, že ve vašem novém HTML souboru na začátku naťukáte *Front Matter*, kde určíte, že váš layout kategorií bude využívat layout *page*. Na začátku souboru byste tedy měli mít toto:

{% highlight yaml %}
---
layout: page
---
{% endhighlight %}

Koho zajímá, co se skrývá pod *layout: page* - odpověď naleznete v souborech Minimy, kde se ve složce *_layouts* nachází soubor *page.html* (který odkazuje na default.html, který využívá include dalších částí). Nebojte se toho a soubory si klidně prohlédněte. Když zkusíte na chvilku nemyslet na to, že to vypadá jako španělská vesnice, tak si všimnete, že jsou v kódu jisté části, kterým budete rozumět a možná vám to dá lepší představu o tom, jak jsou jednotlivé stránky generátorem vytvářeny a třeba se vám to někdy do budoucna bude hodit.

Ale zpátky k našemu layoutu. Náš layout bude využívát HTML pro vytvoření struktury stránky a Liquid pro přístup k proměnným blogu a jednotlivých příspěvků.

HTML je značkovací jazyk, který nabízí mimo jiné tag pro nadpis (na rozcestníku jsem využila nadpis třetí úrovně pro členění kategorií), tag pro seznam a jeho položky a tag pro odkazy. Tak pro nadpis se nazývá *h3*, seznam *ul* a jeho položky mají tag *li*, odkazy značí tzv. anchor, *a*.

Výše zmíněné proměnné, které jsem použila, jsou:
- categories (přístup přes *site*)
- url, date, title (přístupné přes *post*)

A protože položky seznamu jsou defaultně zobrazovány s odrážkami, mám na začátku ještě trochu CSS, které upravuje vzhled seznamu.

Výsledný kód v souboru *categories.html*, pod front matterem, vypadá následovně:

{% highlight html %}{% raw %}
<style>
  ul {
  list-style-type: none; 
  padding: 0; 
  margin: 0; 
}
</style>

  {% for category in site.categories %}
    <h3 id="{{ category | first | replace: ' ', '_' }}">{{ category | first }}</h3>
      <ul>
      {% for post in category.last %}
        <li><a href="{{ post.url }}">{{ post.date | date: "%d-%m-%Y" }} &emsp; {{ post.title }}</a></li>
      {% endfor %}
      </ul>
    </li>
  {% endfor %}
{% endraw %}{% endhighlight %}

(Kód výše naleznete i na GitHubu pod [tímto odkazem](https://github.com/kaelwi/kaelwi.github.io/blob/master/docs/_layouts/categories.html){:target="_blank"}).

A co vlastně tahle část dělá? Nejprve určí styl seznamu, protože chci mít jednotlivé položky seznamu bez odrážek. Potom přichází na řadu Liquid. *for* představuje v programování iterování přes nějakou kolekci, seznam, apod. V mém případě chci nejdříve projet jednotlivé kategorie. Nyní si všimněte druhé *for* smyčky, která se nachází uvnitř té první - ta udává, že pro každou kategorii chci projet všechny příspěvky. *id* u nadpisu vytvářím proto, abych mohla v příspěvcích odkazovat přímo na tuto část stránky. I tady se jedná o Liquid v HTML. Vlastně všechno, co je ve dvou složených závorkách, je Liquid. A tady i vidíte, jak se dá sáhnout na proměnné - *site.categories* nebo *post.title* je příklad přístup k proměnným blogu a příspěvku.

Pro opravdu zvědavé ještě vysvětlení každého Liquid-řádku.

{% highlight html %}{% raw %}
  {% for category in site.categories %}
  ...
  {% endfor %}
{% endraw %}{% endhighlight %}

- Vnější smyčka, která v každém kroku vezme jednu kategorii ze seznamu site.categories
- Uvnitř smyčky máme přístup k proměnné *category*, za kterou se skrývá právě jedna kategorie

{% highlight html %}{% raw %}
  {% for category in site.categories %}
    <h3 id="{{ category | first | replace: ' ', '_' }}">{{ category | first }}</h3>
  {% endfor %}
{% endraw %}{% endhighlight %}

- Vytvoření nadpisu třetí úrovně pro každou kategorii
- Id tagu je to, co se skrývá za proměnnou *category*; protože by id mělo být bez mezer, využila jsem možnost Liquidu *replace*, kde říkám, že chci vyměnit mezery za podtržítka
- Mezi h3 tagy je onen nadpis, který se zobrazí na stránce; v mém případě tedy kategorie

{% highlight html %}{% raw %}
  {% for category in site.categories %}
    <h3 id="{{ category | first | replace: ' ', '_' }}">{{ category | first }}</h3>
      <ul>
      {% for post in category.last %}
        ...
      {% endfor %}
      </ul>
    </li>
  {% endfor %}
{% endraw %}{% endhighlight %}

- Nyní ona druhá smyčka uvnitř smyčky přes kategorie, která se nachází již uvnitř tagu *ul* (unordered list, seznam)
- Tato druhá smyčka má za úkol projít příspěvky v rámci vybrané kategorie

{% highlight html %}{% raw %}
  {% for category in site.categories %}
    <h3 id="{{ category | first | replace: ' ', '_' }}">{{ category | first }}</h3>
      <ul>
      {% for post in category.last %}
        <li><a href="{{ post.url }}">{{ post.date | date: "%d-%m-%Y" }} &emsp; {{ post.title }}</a></li>
      {% endfor %}
      </ul>
    </li>
  {% endfor %}
{% endraw %}{% endhighlight %}

- Uvnitř smyčky vytvářím pro každý příspěvek oné kategorie položku seznamu, která se zobrazí ve formě odkazu (*a*, anchor)
- Odkaz má atribut *href*, kde se nachází adresa, kam budu odkazovat
  - Každý příspěvek má vlastní URL, ke které mám díky Liquidu přístup
- Uvnitř *a* tagu se pak nachází text, který se má zobrazit uživateli, a za kterým se skrývá onen odkaz
  - Já jsem chtěla, aby na začátku textu bylo datum vytvoření příspěvku v mnou určeném formátu, potom velká mezera (vlastně 4x mezerník) a nakonec název příspěvku, titul

A takhle jsem vytvořila layout pro můj rozcestník. Nakonec je potřeba vytvořit stránku, kde ho využijeme. K tomu si na stejné úrovni, kde jste si vytvořili i složku _layouts, vytvořte MARKUP soubor (v mém případě *rozcestnik.md*) a do něho vložte na začátek pouze tento malý front matter:

{% highlight yaml %}
---
layout: categories
title: "Rozcestník"
---
{% endhighlight %}

Voilá, pokud vše klaplo, tak jak mělo, měl by se vám teď vedle stránky "About" zobrazovat i váš nový rozcestník 🥳

## Kam dál?

*TBD. Všiml/-a sis, že se na záložce prohlížeče u hlavní stránky zobrazuje název blogu a jeho celý popisek? Pokud se ti to nelíbí, pak se můžeš v pondělí 26.2.2024 podívat, jak tohle zobrazení změníš.*

{% comment %} [Title = title \| description???]({% post_url blogovani/2024-02-26-title-tag-title-description %}) {% endcomment %}
