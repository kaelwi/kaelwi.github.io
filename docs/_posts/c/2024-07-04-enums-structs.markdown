---
layout: post
title:  "Enum a Struct"
date:   2024-07-04 07:00:00 +0200
last_modified_at: 2024-07-4 07:00:00 +0200
category: Programovací jazyk C
css_class: c
read_time: 3 min 11 s
description: Enum a struct. Typy, vlastnosti a využití.
excerpt: Enum a struct. Typy, vlastnosti a využití.
permalink: programovaci-jazyk-c/enum-struct
---

[Předchozí [Dynamická alokace paměti]]({% post_url c/2024-06-27-dynamicka-alokace-pameti %})

## Výčtový typ enum

Představ si situaci, kdy potřebuješ v kódu mít všechny dny v týdnu definované jednotlivě. A teď si představ, že je můžeš mít jako jednoduchý výčet! Lepší, ne? I v Céčku je to možné a to za pomoci tzv. enum.

### Typy enum

Existuje enum s tagem a enum bez tagu.

#### enum s tagem

Takový enum vypadá následovně:

{% highlight c %}
enum _Result_ { INCORRECT, CORRECT };
{% endhighlight %}

Přičemž _Result je právě tag a enum umožňuje hodnoty INCORRECT a CORRECT.

Compiler v případě enumů provádí kontrolu, zda je hodnota správná/povolená (compiler tuto kontrolu neprovádí, pokud máme hodnotu danou pomocí #define). Hodnoty enumu (jako např. CORRECT) jsou celočíselné.

Použití:

{% highlight c %}
enum _Result_ answer = CORRECT;
{% endhighlight %}

Jde to i jednoduššeji a to za pomocí *typedef*:

{% highlight c %}
typedef enum _Result_ { INCORRECT, CORRECT } Result;
Result answer = CORRECT;
{% endhighlight %}

#### enum bez tagu

{% highlight c %}
enum { INCORRECT, CORRECT };
{% endhighlight %}

Nevýhodou je, že nemáme žádný datový typ, na který bysme se mohli odkazovat u návratných hodnot funkcí, parametrů případně u později vytvořených proměnných. I zde si ale můžeme vypomoct typedefem:

{% highlight c %}
typedef enum { INCORRECT, CORRECT } Result;
Result answer = CORRECT;
{% endhighlight %}

## Struktury

Programovací jazyk C není objektově orientovaný programovací jazyk. Trošku tuhle abstrakci ale můžeme napodobit využitím *structs*.

{% highlight c %}
typedef struct _Question_
{
    char* question_;
    char* answer_;
    struct _Question_* next;
} Question;
{% endhighlight %}

Tento konkrétní struct je možné vnímat i jako počátek implementace lineárního seznamu.

### Příklad

Na ukázce výše postavíme názornou ukázku použití. Napíšeme program, ve kterém vytvoříme seznam otázek a jejich odpovědí, které následně vytiskneme na konzoli. Otázky tvoříme na heapu, ne na stacku.

Pro vytvoření otázky si napíšeme novou funkci, které předáme text otázky a text její odpovědi.

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>

typedef struct _Question_
{
    char* question_;
    char* answer_;
    struct _Question_* next;
} Question;

Question* newQuestion(char* question_text, char* answer_text)
{
  Question* new_question = malloc(sizeof(Question));
  if (new_question == NULL)
  {
    printf("Error při alokaci paměti!");
    return NULL;
  }

  // +1 kvůli null-byte \0
  new_question->question_ = malloc((strlen(question_text) + 1) * sizeof(char));
  if (new_question->question_ == NULL)
  {
    printf("Error při alokaci paměti!");
    return NULL;
  }
  // char* strcpy(char *destination, const char* source);
  // strcpy zkopíruje C string z místa v paměti, kam ukazuje source na místo v paměti, kam ukazuje destination (včetně null-bytu)
  strcpy(new_question->question_, question_text);

  new_question->answer_ = malloc((strlen(answer_text) + 1) * sizeof(char));
  if (new_question->answer_ == NULL)
  {
    printf("Error při alokaci paměti!");
    return NULL;
  }
  strcpy(new_question->answer_, answer_text);

  new_question->next_ = NULL;

  return new_question;
}
{% endhighlight %}

Všimni si, že při vytvoření nové otázky necháváme next_ ještě hodnotu NULL. Protože při vytvoření jedné otázky ještě nemáme žádný ukazatel na další!

Pro přidání další otázky a vytvoření odkazu z jedné na druhou si napíšeme další funkci.

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>

typedef struct _Question_
{
    char* question_;
    char* answer_;
    struct _Question_* next;
} Question;

Question* newQuestion(char* question_text, char* answer_text)
{
  Question* new_question = malloc(sizeof(Question));
  if (new_question == NULL)
  {
    printf("Error při alokaci paměti!");
    return NULL;
  }

  // +1 kvůli null-byte \0
  new_question->question_ = malloc((strlen(question_text) + 1) * sizeof(char));
  if (new_question->question_ == NULL)
  {
    printf("Error při alokaci paměti!");
    return NULL;
  }
  // char* strcpy(char *destination, const char* source);
  // strcpy zkopíruje C string z místa v paměti, kam ukazuje source na místo v paměti, kam ukazuje destination (včetně null-bytu)
  strcpy(new_question->question_, question_text);

  new_question->answer_ = malloc((strlen(answer_text) + 1) * sizeof(char));
  if (new_question->answer_ == NULL)
  {
    printf("Error při alokaci paměti!");
    return NULL;
  }
  strcpy(new_question->answer_, answer_text);

  new_question->next_ = NULL;

  return new_question;
}

void addQuestion(Question* question, Question* new_question)
{
  // v původní otázce je na místě new_ NULL
  new_question->new_ = question->new_;
  question->new_ = new_question;
}
{% endhighlight %}

A nakonec ještě funkci na uvolnění paměti, kterou už nepotřebujeme:

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>

typedef struct _Question_
{
    char* question_;
    char* answer_;
    struct _Question_* next;
} Question;

Question* newQuestion(char* question_text, char* answer_text)
{
  Question* new_question = malloc(sizeof(Question));
  if (new_question == NULL)
  {
    printf("Error při alokaci paměti!");
    return NULL;
  }

  // +1 kvůli null-byte \0
  new_question->question_ = malloc((strlen(question_text) + 1) * sizeof(char));
  if (new_question->question_ == NULL)
  {
    printf("Error při alokaci paměti!");
    return NULL;
  }
  // char* strcpy(char *destination, const char* source);
  // strcpy zkopíruje C string z místa v paměti, kam ukazuje source na místo v paměti, kam ukazuje destination (včetně null-bytu)
  strcpy(new_question->question_, question_text);

  new_question->answer_ = malloc((strlen(answer_text) + 1) * sizeof(char));
  if (new_question->answer_ == NULL)
  {
    printf("Error při alokaci paměti!");
    return NULL;
  }
  strcpy(new_question->answer_, answer_text);

  new_question->next_ = NULL;

  return new_question;
}

void addQuestion(Question* question, Question* new_question)
{
  // v původní otázce je na místě new_ NULL
  new_question->new_ = question->new_;
  question->new_ = new_question;
}

void freeAllQuestions(Question* question)
{
  // iterujeme přes celý seznam, neposouváme otázky po odstranění jedné uprostřed
  while (question != NULL)
  {
    Question* next = question->next;
    // nesmíme zapomenout pustit i místo alokované pro textové řetězce!
    free(question->question_);
    free(question->answer_);
    free(question);
    question = next;
}
{% endhighlight %}

A konečně zkouška v mainu:

{% highlightc %}
int main(void)
{
  Question* q1 = newQuestion(
    "Otázka 1",
    "Odpověď 1"
  );
  
  Question* q2 = newQuestion(
    "Otázka 2",
    "Odpověď 2"
  );

  // teprve zde z otázek vytváříme seznam
  addQuestion(q1, q2);

  Question* current_question = q1;
  while (current_question != NULL)
  {
    printf("Q: %s\n", current_question->question_);
    printf("A: %s\n\n", current_question->answer_);  
    current_question = current_question->next_;
  }

  freeAllQuestions(q1);

  return 0;
}
{% endhighlight %}

Připomínám, že program je možné přeložit a spustit následovně:

{% highlight console %}
clang -Wall -o question question.c
./question
{% endhighlight %}

Pokud by si někdo chtěl program projet valgrindem (pro kontrolu případných problémů s alokovanou pamětí):

{% highlight console %}
clang -g -Wall -o question question.c
valgrind --tool=memcheck --leak-check=yes ./question
{% endhighlight %}

## Kam dál?

*\-TBD\-*