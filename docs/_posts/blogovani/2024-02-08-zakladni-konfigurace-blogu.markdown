---
layout: post
title:  "Základní konfigurace blogu"
date:   2024-02-08 07:00:00 +0200
last_modified_at: 2024-02-12 11:20:00 +0200
category: Blogování
css_class: blogovani
read_time: 1 min 59 s
description: Úvod do blogování s Jekyllem. Druhý díl blogování zdarma. Základní konfigurace Jekyll blogu, seznámení se souborem _config.yml, nastavení názvu, popisu, kontaktních údajů.
excerpt: Úvod do blogování s Jekyllem. Druhý díl blogování zdarma. Základní konfigurace Jekyll blogu, seznámení se souborem _config.yml, nastavení názvu, popisu, kontaktních údajů.
permalink: blogovani/zakladni-konfigurace-blogu
---

[Předchozí [Jak založit blog]]({% post_url blogovani/2024-02-05-jak-zalozit-blog %})

V dnešním článku Vám ukážu, kde je třeba provést změny, abyste blogu mohli dodat název a například vyměnili vzorovou emailovou adresu za vlastní.

## _config.yml

Pokud se Vám podařilo vše spustit tak, jak jsem popsala v posledním článku, měli byste mít stránku vypadající zhruba následovně:

![Screenshot náhledu blogu bez úprav](/assets/images/blogovani/2024-02-08-zakladni-konfigurace-blogu/initial_look.JPG)

K tomu, abyste mohli provést základní úpravy a nastavení, je potřeba úprav v souburu _config.yml, který Vám byl na začátku vygenerován. V tomto souboru je možné nastavit proměnné, které pak bude možné využívat kdekoli na blogu (sami tvůrci uvádí jako příklad šablony, které si odtud berou například název nebo email).

Pozor, jak je zmíněno i na úvodu config souboru, **je třeba vždy restartovat server pro zobrazení změn** provedených v tomto souboru!

{% highlight console %}
bundle exec jekyll serve
{% endhighlight %}

Já jsem prozatím změnila název (title), email, popisek (description) a odkazy na sociální média. Ponechala jsem GitHub a přidala Discord.

Pro zvědavé, tady postup, jak jsem Discord přidala:

1. V souboru _config.yml jsem pod github_username přidala proměnnou discord_server a za dvojtečku dodala název mého serveru.

    ![Screenshot _config.yml s proměnnou discord_server](/assets/images/blogovani/2024-02-08-zakladni-konfigurace-blogu/config_discord.JPG)

2. Ikony se nacházejí v zápatí hlavní/domovské stránky. Jak je vidět v _config.yml, blog defaultně používá šablonu/theme "minima". Aby bylo možné zápatí upravit, musíme nejdřív najít soubory tvořící minimu:

    ```console
    bundle info --path minima
    ```

    Tam ve složce _layouts najdeme home.html, který využívá layout default (default.html, viz první řádek po otevření souboru). V soubouru default.html zase můžeme vidět zmínku "include footer.html", který najdeme, když se vrátíme v prohlížeči souborů o úroveň výše a vlezeme do složky "_includes". Soubor footer.html používá social.html a tady provedeme další změny.

3. Pro zjednodušení celé situace jsem si v souboru social.html nejdříve zkopírovala jeden už existující řádek, abych ho následovně mohla pouze upravit.

    Jak už jsem zmínila, discord_server je proměnná. Tu jsme "vytvořili" v _config.yml souboru a přes site.*proměnná* ji můžeme použít. Tady jsem tedy jen upravila if-podmínky, odkaz na server a odkaz na SVG (viz níže).

4. A nyní k samotnému obrázku, ikoně. SVG jsem si nechala vygenerovat online. Když zadáte do Google "discord svg", vyjede vám toho dost. Následně jsem stejně jako u social.html i v soubouru minima-social-icons.svg (ve složce assets o úroveň výše) zkopírovala řádek a ten pouze upravila. Zde pro úplnost výsledný kód:

    {% highlight xml %}
    <symbol id="discord" viewBox="0 -28.5 256 256" preserveAspectRatio="xMidYMid" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill-rule="nonzero" /></symbol>
    {% endhighlight %}

A zde výsledek pro srovnání v počátečním screenshotem:

![Screenshot náhledu blogu po základních úpravách](/assets/images/blogovani/2024-02-08-zakladni-konfigurace-blogu/look_after_config_changes.JPG)

## Kam dál?

[Jak vytvořit příspěvek na blog]({% post_url blogovani/2024-02-12-jak-vytvorit-prispevek %})

{% comment %}nebo [Jak zarovnat social media ikony a social media s emailem](TODO) {% endcomment %}
