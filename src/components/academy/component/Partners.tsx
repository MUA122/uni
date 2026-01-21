import * as React from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import SectionShell from "../../layout/SectionShell";

const MAIN = "#30508C";
const OTHER = "#B0FDEB";

type PartnerCard = {
  id: string;
  titleKey: string;
  descKey: string;
  defaultTitle: string;
  defaultDesc: string;
  image: string;
};

export default function MeetOurPartnersIaau() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = useTheme();
  const { t } = useTranslation("partners");
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  const sliderRef = React.useRef<HTMLDivElement | null>(null);

  const partners: PartnerCard[] = React.useMemo(
    () => [
      {
        id: "p1",
        titleKey: "cards.p1.title",
        descKey: "cards.p1.desc",
        defaultTitle: "UNESCO",
        defaultDesc:
          "Partnering with UNESCO to support education, sustainability, research exchange, and innovation through international initiatives.",
        image:
          "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "p2",
        titleKey: "cards.p2.title",
        descKey: "cards.p2.desc",
        defaultTitle: "University of Grenoble Alpes",
        defaultDesc:
          "Academic cooperation in advanced studies, joint programs, and research collaboration with one of France’s leading universities.",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "p3",
        titleKey: "cards.p3.title",
        descKey: "cards.p3.desc",
        defaultTitle: "Sapienza University of Rome",
        defaultDesc:
          "Strengthening global academic connections through knowledge exchange, joint research projects, and international learning opportunities.",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      },
    ],
    [],
  );

  return (
    <SectionShell
      id="partners"
      title={t("title", "Meet our partners")}
      subtitle={t(
        "subtitle",
        "Explore international collaborations and academic partnerships.",
      )}
      variant="light"
    >
      <Box
        sx={{
          direction: isRTL ? "rtl" : "ltr",
          width: "100%",
        }}
      >
        {/* Cards slider */}
        <Box
          ref={sliderRef}
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: {
              xs: "85%",
              sm: "55%",
              md: "calc((100% - 40px) / 3)",
            },
            gap: 2.5,

            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            pb: 1,
            px: 0.2,

            "&::-webkit-scrollbar": { height: 6 },
            "&::-webkit-scrollbar-thumb": {
              background: alpha(MAIN, 0.25),
              borderRadius: 999,
            },
          }}
        >
          {partners.map((p) => (
            <Box
              key={p.id}
              sx={{
                scrollSnapAlign: "start",
                borderRadius: 2.5,
                overflow: "hidden",

                background: alpha("#fff", 0.92),
                border: `1px solid ${alpha(MAIN, 0.12)}`,
                transition: "transform 220ms ease, box-shadow 220ms ease",
                cursor: "pointer",

                minHeight: 360,
                display: "flex",
                flexDirection: "column",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 18px 56px rgba(0,0,0,0.12)",
                },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  height: 180,
                  backgroundImage: `url(${p.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  flexShrink: 0,
                }}
              />

              {/* Bottom area */}
              <Box
                sx={{
                  px: 2.4,
                  py: 2.2,
                  background: alpha(OTHER, 0.55),
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 950,
                    fontSize: { xs: 30, md: 34 },
                    letterSpacing: "-0.02em",
                    color: MAIN,
                    mb: 1,
                  }}
                >
                  {t(p.titleKey, p.defaultTitle)}
                </Typography>

                <Typography
                  sx={{
                    color: alpha(MAIN, 0.92),
                    fontSize: 14,
                    lineHeight: 1.6,
                    maxWidth: 340,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(p.descKey, p.defaultDesc)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </SectionShell>
  );
}
