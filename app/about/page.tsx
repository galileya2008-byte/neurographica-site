import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { CurvedLines } from "@/components/decor/curved-lines";
import { SiteImage } from "@/components/ui/site-image";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Обо мне",
  description:
    "Галина Оноприенко — дипломированный инструктор нейрографики. Более 17 лет онлайн, 1000+ мастер-классов. Осознанный подход без обещаний «волшебных таблеток».",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden section-padding pt-32">
        <CurvedLines variant="hero" className="opacity-70" />
        <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Обо мне
              </p>
              <h1 className="mt-4 text-balance text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15]">
                Я верю, что настоящие изменения начинаются с человека
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {siteConfig.expert} — дипломированный инструктор нейрографики.
                Более 17 лет онлайн-работы и более 1000 проведённых мастер-классов.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
              <SiteImage
                src="/images/galina/portrait-premium.png"
                alt={siteConfig.expert}
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden section-padding bg-warm">
        <CurvedLines variant="section-left" />
        <Container className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card lg:sticky lg:top-28 lg:self-start">
            <SiteImage
              src="/images/galina/at-work.png"
              alt={`${siteConfig.expert} за работой`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>

          <div className="space-y-6 text-base leading-relaxed text-muted md:text-lg">
            <p>
              Уже более 17 лет я работаю онлайн и убеждена, что именно этот формат
              делает знания и качественное обучение доступными для людей независимо
              от того, в каком городе или стране они живут.
            </p>
            <p>
              Когда-то работа в интернете стала для меня необходимостью. Со временем
              я поняла, что это гораздо больше, чем способ проводить занятия на
              расстоянии. Онлайн открывает возможность сопровождать людей там, где
              им удобно, и возвращаться к материалам тогда, когда это действительно
              нужно.
            </p>
            <p>
              Сегодня я — дипломированный Инструктор нейрографики. Помимо базовой
              подготовки и квалификации специалиста, я регулярно прохожу
              дополнительное обучение и несколько раз в год обновляю свои знания.
              Для меня важно не останавливаться в профессиональном развитии и давать
              своим ученикам современные, качественные и продуманные программы.
            </p>
            <p>
              За это время я провела более{" "}
              <strong className="font-medium text-foreground">1000 мастер-классов</strong>,
              и каждый из них подтверждает простую мысль: устойчивые изменения
              рождаются не из ожидания чуда, а из собственных действий.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden section-padding">
        <CurvedLines variant="section-right" />
        <Container className="relative z-10 max-w-3xl space-y-6 text-base leading-relaxed text-muted md:text-lg">
          <h2 className="text-3xl text-foreground md:text-4xl">
            Не волшебная таблетка — а ваши действия
          </h2>
          <p>
            Именно поэтому мои программы посвящены не поиску «волшебной таблетки».
            Мы работаем с темами намерения, мотивации, планирования, внутренней опоры
            и движения к своим целям. Нейрографика становится инструментом для
            осознанной работы с собой, а не заменой собственных решений и поступков.
          </p>
          <p>
            Мне близка мысль, что каждый человек способен стать алхимиком собственной
            жизни. Не потому, что существует универсальный секрет успеха, а потому,
            что изменения начинаются с внимания к себе, готовности действовать и
            способности шаг за шагом создавать ту жизнь, к которой хочется идти.
          </p>
          <p>
            Для меня важно, чтобы обучение было не только полезным, но и комфортным.
            Поэтому все материалы остаются у участников с бессрочным доступом, к ним
            можно возвращаться в удобное время и проходить практики в своем темпе.
          </p>
          <p>
            Многие ученики приходят на один мастер-класс, а затем остаются со мной
            на более глубоких программах. И особенно ценно для меня слышать, что люди
            отмечают не только качество материалов, но и атмосферу поддержки,
            внимание к каждому вопросу и желание продолжать развиваться дальше.
          </p>
        </Container>
      </section>

      <section className="relative overflow-hidden section-padding bg-accent-light/40">
        <CurvedLines variant="section-left" />
        <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 text-base leading-relaxed text-muted md:text-lg">
            <h2 className="text-3xl text-foreground md:text-4xl">
              Образование и квалификация
            </h2>
            <p>
              Я прошла профессиональное обучение у создателя метода нейрографики —{" "}
              <a
                href={siteConfig.methodAuthor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-4 hover:opacity-80"
              >
                Павла Пискарёва
              </a>
              {" "}— и регулярно повышаю квалификацию.
            </p>
            <p>
              Несколько раз в год обновляю профессиональные знания, чтобы давать
              актуальные, качественные и продуманные форматы обучения.
            </p>
            <blockquote className="border-l-2 border-chocolate/30 pl-5 font-display text-xl italic leading-relaxed text-foreground md:text-2xl">
              Если вам близок осознанный подход без громких обещаний — я буду рада
              стать вашим проводником на этом пути.
            </blockquote>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-card">
            <SiteImage
              src="/images/galina/with-pavel-piskarev.png"
              alt={`${siteConfig.expert} с Павлом Пискарёвым`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden section-padding">
        <CurvedLines variant="cta" />
        <Container className="relative z-10 max-w-3xl text-center">
          <h2 className="text-balance text-3xl text-foreground md:text-4xl">
            Приглашение
          </h2>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-muted">
            Если вам близок осознанный подход без громких обещаний и вы хотите
            познакомиться с нейрографикой как с творческим методом исследования
            своих целей, намерений и внутренних ресурсов, я буду рада стать вашим
            проводником на этом пути.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/masterclasses" size="lg">
              Выбрать мастер-класс
            </Button>
            <Button href="/programs" variant="secondary" size="lg">
              Смотреть программы
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
