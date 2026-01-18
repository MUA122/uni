import { Box, Typography, Stack, Card, CardContent } from "@mui/material";
import SectionShell from "../layout/SectionShell";
import ucalogo from "/imgs/uga.png";
import saplogo from "/imgs/sapienza.png";
import ihslogo from "/imgs/ihs.png";
import iusatLogo from "/imgs/iusat.png";
import unescoLogo from "/imgs/unesco.png";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function InternationalCollaboration() {
  const { t } = useTranslation("collab");
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "en";
  const isRTL = currentLang === "ar";

  return (
    <SectionShell
      id="collab"
      title={t("title")}
      subtitle={t("subtitle")}
      variant="light"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3.5,
          alignItems: "stretch",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Box
              onClick={() =>
                window.open(
                  "https://www.unesco.org/",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              sx={{
                width: "100%",
                minHeight: { xs: 320, md: 340 },
                borderRadius: { xs: 2, md: 2 },
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "stretch",

                // Hover Style
                transition: "transform 240ms ease, box-shadow 240ms ease",
                boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 26px 70px rgba(0,0,0,0.18)",
                },
              }}
            >
              {/* Background Image */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: "scale(1.02)",
                }}
              />

              {/* Green Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(7,116,113,0.88) 0%, rgba(7,116,113,0.72) 55%, rgba(7,116,113,0.55) 100%)",
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: { xs: 2, md: 3 },
                  p: { xs: 3, md: 4 },
                  flexDirection: isRTL ? "row-reverse" : "row",
                }}
              >
                {/* Text Area */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",

                    pr: isRTL ? { xs: 0, md: 26 } : 0,
                    pl: !isRTL ? { xs: 0, md: 0 } : 0,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.9)",
                        fontSize: 13,
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        mb: 1,
                        textAlign: isRTL ? "right" : "left",
                      }}
                    >
                      {t("cards.unesco.badge")}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 900,
                        fontSize: isRTL
                          ? { xs: 28, md: 40 }
                          : { xs: 30, md: 44 },

                        lineHeight: 1.05,
                        mb: 2,
                        textAlign: isRTL ? "right" : "left",
                      }}
                    >
                      {t("cards.unesco.title") || "UNESCO Partnership"}
                      <br />
                      {t("cards.unesco.subtitle") || "with IUSAT University"}
                    </Typography>

                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.92)",
                        fontSize: { xs: 14, md: 16 },
                        lineHeight: 1.7,
                        maxWidth: 620,
                        textAlign: isRTL ? "right" : "left",
                      }}
                    >
                      {t("cards.unesco.desc") ||
                        "Building international cooperation through UNESCO programs in education, sustainability, research exchange, and innovation."}
                    </Typography>
                  </Box>

                  {/* CTA */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      mt: 3,
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: { xs: 18, md: 22 },
                      width: "fit-content",
                      transition: "opacity 220ms ease",
                      "&:hover": { opacity: 0.9 },
                      flexDirection: isRTL ? "row-reverse" : "row",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: 18, md: 22 },
                        color: "#fff",
                      }}
                    >
                      {t("cards.unesco.cta") || "Find Out More"}
                    </Typography>

                    <ArrowForwardRoundedIcon
                      sx={{ fontSize: 26, color: "#fff" }}
                    />
                  </Stack>
                </Box>

                {/* Right Side Logos */}
                <Box
                  sx={{
                    position: isRTL ? "absolute" : "relative",
                    top: isRTL ? { xs: 20, md: 22 } : "auto",
                    right: isRTL ? { xs: 20, md: 28 } : "auto",

                    width: isRTL ? { xs: 150, md: 200 } : { xs: 170, md: 240 },

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 4,
                  }}
                >
                  <Stack
                    spacing={
                      isRTL ? { xs: 0.9, md: 1.1 } : { xs: 1.2, md: 1.5 }
                    }
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: "100%" }}
                  >
                    {/* IUSAT Pill */}
                    <Box
                      sx={{
                        width: "100%",
                        borderRadius: 8,
                        background: "#fff",
                        display: "grid",
                        placeItems: "center",

                        py: isRTL ? { xs: 2.0, md: 2.4 } : { xs: 2.6, md: 3.2 },
                        px: isRTL ? { xs: 1.6, md: 2.0 } : { xs: 2.2, md: 2.8 },

                        boxShadow: "0 22px 50px rgba(0,0,0,0.20)",
                        transition: "transform 240ms ease",
                        "&:hover": { transform: "scale(1.03)" },
                      }}
                    >
                      <Box
                        component="img"
                        src={iusatLogo}
                        alt="IUSAT"
                        sx={{
                          width: isRTL ? "48%" : "40%",
                          maxWidth: isRTL
                            ? { xs: 95, md: 120 }
                            : { xs: 130, md: 170 },
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                      <Typography
                        sx={{
                          color: "#0B6F73",
                          fontWeight: 900,
                          fontSize: isRTL ? 15 : 18,
                        }}
                      >
                        IUSAT
                      </Typography>
                    </Box>

                    {/* Handshake */}
                    <Box sx={{ display: "grid", placeItems: "center" }}>
                      <HandshakeRoundedIcon
                        sx={{
                          fontSize: isRTL
                            ? { xs: 22, md: 24 }
                            : { xs: 26, md: 28 },
                          color: "rgba(255,255,255,0.95)",
                          filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.35))",
                        }}
                      />
                    </Box>

                    {/* UNESCO Pill */}
                    <Box
                      sx={{
                        width: "100%",
                        borderRadius: 8,
                        background: "#fff",
                        display: "grid",
                        placeItems: "center",

                        py: isRTL ? { xs: 2.0, md: 2.4 } : { xs: 2.6, md: 3.2 },
                        px: isRTL ? { xs: 1.6, md: 2.0 } : { xs: 2.2, md: 2.8 },

                        boxShadow: "0 22px 50px rgba(0,0,0,0.20)",
                        transition: "transform 240ms ease",
                        "&:hover": { transform: "scale(1.03)" },
                      }}
                    >
                      <Box
                        component="img"
                        src={unescoLogo}
                        alt="UNESCO"
                        sx={{
                          width: isRTL ? "48%" : "40%",
                          maxWidth: isRTL
                            ? { xs: 95, md: 120 }
                            : { xs: 130, md: 170 },
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#2f62ae",
                          fontWeight: 900,
                          fontSize: isRTL ? 15 : 18,
                          mt: 1,
                        }}
                      >
                        UNESCO
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>

              {/* Border Glow */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: { xs: 3, md: 4 },
                  border: "1px solid rgba(255,255,255,0.16)",
                  pointerEvents: "none",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2.5,
          }}
        >
          {/* 2 - ENSAC */}
          <Card
            sx={{
              borderRadius: 2,
              p: 2,
              background: "rgba(255, 255, 255, 0.72)",
              border: "3px solid #0B6F73",
              borderColor: "rgba(11,111,115,0.18)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
              cursor: "pointer",
              transition:
                "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.72)",
                border: "3px solid #0B6F73",
              },
            }}
            onClick={() =>
              window.open(
                "https://www.univ-grenoble-alpes.fr/",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <CardContent
              sx={{
                p: { xs: 2.5, md: 3 },
                "&:last-child": { pb: { xs: 2.5, md: 3 } },
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Stack
                direction={isRTL ? "row-reverse" : "row"}
                alignItems="center"
                spacing={2}
                sx={{ gap: isRTL ? 1 : 0 }}
              >
                <Box
                  sx={{
                    minWidth: 44,
                    height: 44,
                    borderRadius: "50%",
                    bgcolor: "#0B6F73",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    mr: 5,
                    boxShadow: "0 8px 18px rgba(11,111,115,0.25)",
                  }}
                >
                  2
                </Box>

                <Box
                  sx={{
                    width: "8px",
                    height: "50px",
                    borderRadius: 4,
                    background:
                      "linear-gradient(180deg, #0b6f73 0%, #2cc5b9 100%)",
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ fontWeight: 900, fontSize: 19, color: "#1a1a1a" }}
                  >
                    {t("cards.ensac.name")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      mt: 0.5,
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t("cards.ensac.desc")}
                  </Typography>
                </Box>
              </Stack>

              <Box
                component="img"
                src={ucalogo}
                alt="UGA Logo"
                sx={{
                  height: { xs: 50, md: 70 },
                  width: "auto",
                  alignSelf: isRTL ? "flex-start" : "flex-end",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            </CardContent>
          </Card>

          {/* 3 - SAPIENZA */}
          <Card
            sx={{
              borderRadius: 2,
              p: 2,
              background: "rgba(255, 255, 255, 0.72)",
              border: "3px solid #0B6F73",
              borderColor: "rgba(11,111,115,0.18)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
              cursor: "pointer",
              transition:
                "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.72)",
                border: "3px solid #0B6F73",
              },
            }}
            onClick={() =>
              window.open(
                "https://www.uniroma1.it/",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <CardContent
              sx={{
                p: { xs: 2.5, md: 3 },
                "&:last-child": { pb: { xs: 2.5, md: 3 } },
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Stack
                direction={isRTL ? "row-reverse" : "row"}
                alignItems="center"
                spacing={2}
                sx={{ gap: isRTL ? 1 : 0 }}
              >
                <Box
                  sx={{
                    minWidth: 44,
                    height: 44,
                    borderRadius: "50%",
                    bgcolor: "#0B6F73",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 8px 18px rgba(11,111,115,0.25)",
                  }}
                >
                  3
                </Box>

                <Box
                  sx={{
                    width: "8px",
                    height: "50px",
                    borderRadius: 4,
                    background:
                      "linear-gradient(180deg, #0b6f73 0%, #2cc5b9 100%)",
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ fontWeight: 900, fontSize: 19, color: "#1a1a1a" }}
                  >
                    {t("cards.sapienza.name")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      mt: 0.5,
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t("cards.sapienza.desc")}
                  </Typography>
                </Box>
              </Stack>

              <Box
                component="img"
                src={saplogo}
                alt="Sapienza Logo"
                sx={{
                  height: { xs: 50, md: 70 },
                  width: "auto",
                  alignSelf: isRTL ? "flex-start" : "flex-end",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            </CardContent>
          </Card>

          {/* 4 - IHS */}
          <Card
            sx={{
              borderRadius: 2,
              p: 2,
              background: "rgba(255, 255, 255, 0.72)",
              border: "3px solid #0B6F73",
              borderColor: "rgba(11,111,115,0.18)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
              cursor: "pointer",
              transition:
                "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.72)",
                border: "3px solid #0B6F73",
              },
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2.5, md: 3 },
                "&:last-child": { pb: { xs: 2.5, md: 3 } },
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Stack
                direction={isRTL ? "row-reverse" : "row"}
                alignItems="center"
                spacing={2}
                sx={{ gap: isRTL ? 1 : 0 }}
              >
                <Box
                  sx={{
                    minWidth: 44,
                    height: 44,
                    borderRadius: "50%",
                    bgcolor: "#0B6F73",
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 8px 18px rgba(11,111,115,0.25)",
                  }}
                >
                  4
                </Box>

                <Box
                  sx={{
                    width: "8px",
                    height: "50px",
                    borderRadius: 4,
                    background:
                      "linear-gradient(180deg, #0b6f73 0%, #2cc5b9 100%)",
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ fontWeight: 900, fontSize: 19, color: "#1a1a1a" }}
                  >
                    {t("cards.ihs.name")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      mt: 0.5,
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t("cards.ihs.desc")}
                  </Typography>
                </Box>
              </Stack>

              <Box
                component="img"
                src={ihslogo}
                alt="IHS Logo"
                sx={{
                  height: { xs: 50, md: 70 },
                  width: "auto",
                  alignSelf: isRTL ? "flex-start" : "flex-end",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </SectionShell>
  );
}
