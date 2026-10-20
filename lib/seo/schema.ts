import { geoAuthorSummary, geoKnowsAbout, geoSiteSummary } from "@/config/geo";
import { siteConfig } from "@/config/site";

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}/about/#person`,
    name: siteConfig.expert,
    url: `${siteConfig.url}/about/`,
    image: `${siteConfig.url}/images/galina/at-work.png`,
    jobTitle: "Инструктор нейрографики",
    description: geoAuthorSummary,
    email: siteConfig.email,
    knowsAbout: [...geoKnowsAbout],
    sameAs: [siteConfig.social.telegram],
    worksFor: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.brand,
    alternateName: [siteConfig.expert, "Нейрографика Галина Оноприенко"],
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}/images/galina/at-work.png`,
    description: geoSiteSummary,
    email: siteConfig.email,
    foundingDate: "2008",
    areaServed: {
      "@type": "Country",
      name: "Russia",
    },
    knowsAbout: [...geoKnowsAbout],
    founder: { "@id": `${siteConfig.url}/about/#person` },
    employee: { "@id": `${siteConfig.url}/about/#person` },
    sameAs: [siteConfig.social.telegram],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.email,
        availableLanguage: ["Russian"],
        url: `${siteConfig.url}/contacts/`,
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.brand,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ru-RU",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    about: { "@id": `${siteConfig.url}/about/#person` },
    keywords: geoKnowsAbout.join(", "),
  };
}

/** Единый граф сущностей для GEO: Organization + Person + WebSite */
export function siteEntityGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), personSchema(), websiteSchema()],
  };
}
