import { useTranslation } from "react-i18next";
import { userData } from "../data/userData";
import { award1, award2, STACK_MAIN, STACK_MORE } from "./data";
import { ArrowIcon } from "./icons";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="sobre" className="about" data-cursor="dark">
      <div className="wrap section">
        <div className="section__head">
          <h2 className="display big">{t("site.about.title")}</h2>
          <span className="mono about__hint">{t("site.about.hint")}</span>
        </div>

        <div className="bento">
          <div className="b b--bio" data-cursor="light">
            <span className="mono muted">{t("site.about.place")}</span>
            <p className="b__bio">{t("site.about.bio")}</p>
            <a className="btn" href={userData.curriculo} download>{t("site.about.cv")}</a>
          </div>

          <a className="b b--ph b--p1" href="#/arquivo" data-cursor="media">
            <img src={award1} alt={t("site.about.award1Alt")} loading="lazy" />
            <span className="b__cap">
              <span className="mono">{t("site.about.award1Tag")}</span>
              <span className="display">{t("site.about.award1")}</span>
            </span>
          </a>

          <a className="b b--loud b--awd" href="#/arquivo">
            <span className="display b__times">3×</span>
            <span className="mono">{t("site.about.times")}</span>
          </a>

          <div className="b b--puc" data-cursor="light">
            <span className="ring">
              <svg className="spin" width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
                <defs>
                  <path id="ring-path" d="M66,66 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
                </defs>
                <text className="ring__text">
                  <textPath href="#ring-path">{t("site.about.ring")}</textPath>
                </text>
              </svg>
              <span className="display loud-text ring__n">{t("site.about.semester")}</span>
            </span>
            <span className="mono muted">{t("site.about.semesterLabel")}</span>
          </div>

          <a className="b b--ph b--p2" href="#/arquivo" data-cursor="media">
            <img src={award2} alt={t("site.about.award2Alt")} loading="lazy" style={{ objectPosition: "50% 52%" }} />
            <span className="b__cap">
              <span className="mono">{t("site.about.award2Tag")}</span>
              <span className="display">{t("site.about.award2")}</span>
            </span>
          </a>

          <div className="b b--stk" data-cursor="light">
            <span className="mono muted">{t("site.about.stack")}</span>
            <p className="display b__stack">{STACK_MAIN}</p>
            <p className="mono b__more">{STACK_MORE}</p>
            <span className="mono muted">{t("site.about.languages")}</span>
          </div>

          <a className="b scan b--cer" href="#/arquivo" data-cursor="light">
            <span className="mono muted">{t("site.about.certTag")}</span>
            <span className="b__link"><span className="display">{t("site.about.cert")}</span><span className="arrow"><ArrowIcon /></span></span>
          </a>

          <a className="b scan b--pap" href="#/arquivo" data-cursor="light">
            <span className="mono muted">{t("site.about.papersTag")}</span>
            <span className="b__link"><span className="display">{t("site.about.papers")}</span><span className="arrow"><ArrowIcon /></span></span>
          </a>
        </div>
      </div>
    </section>
  );
}
