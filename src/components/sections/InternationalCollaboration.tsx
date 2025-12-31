import { Box, Typography, Stack, Card, CardContent } from "@mui/material";
import SectionShell from "../layout/SectionShell";
import ucalogo from "/imgs/uga.png";
import saplogo from "/imgs/sapienza.png";
import ihslogo from "/imgs/ihs.png";
import iusatLogo from "/imgs/iusat.png";
import unescoLogo from "/imgs/unesco.png";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
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
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      variant="light"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3.5,
          alignItems: "stretch",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {/* LEFT: UNESCO Feature Card */}
        <Box sx={{ flex: { xs: "1 1 auto", md: 5 } }}>
          <Box
            onClick={() =>
              window.open(
                "https://www.unesco.org/",
                "_blank",
                "noopener,noreferrer"
              )
            }
            sx={{
              height: "100%",
              minHeight: { xs: 320, md: 420 },
              borderRadius: { xs: 2, md: 2 },
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#F5FBFA",
              boxShadow: "0 22px 70px rgba(2, 24, 27, 0.10)",
              border: "3px solid #0B6F73",
              p: { xs: 2.5, md: 3 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: { xs: 2, md: 2.5 },
              "&:hover": {
                boxShadow: "0 28px 90px rgba(2, 24, 27, 0.14)",
                transform: "translateY(-2px)",
              },
              transition: "transform 220ms ease, box-shadow 220ms ease",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: -2,
                backgroundColor: "#F5FBFA",
                filter: "blur(14px)",
                pointerEvents: "none",
              }}
            />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: "relative",
                zIndex: 1,
                px: { xs: 0.5, md: 1 },
              }}
            >
              <Stack
                direction="row"
                spacing={1.25}
                alignItems="center"
                sx={{
                  gap: { xs: 2, md: 6 },
                  flexDirection: isRTL ? "row-reverse" : "row",
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    display: "flex",
                    placeItems: "center",
                    background: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(11,111,115,0.18)",
                    boxShadow: "0 10px 26px rgba(0,0,0,0.07)",
                    backdropFilter: "blur(10px)",
                  }}
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
                    1
                  </Box>
                </Box>

                <Box
                  sx={{
                    height: 30,
                    px: 5,
                    borderRadius: 999,
                    display: "inline-flex",
                    alignItems: "center",
                    border: "1px solid rgba(11,111,115,0.14)",
                    color: "#0B6F73",
                    fontWeight: 900,
                    fontSize: 12.5,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t("cards.unesco.badge")}
                </Box>
              </Stack>
            </Stack>

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 1, md: 2 },
              }}
            >
              <Stack
                spacing={{ xs: 2, md: 2.5 }}
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 3,
                    backgroundColor: "#F5FBFA",
                    border: "1px solid rgba(11,111,115,0.16)",
                    boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
                    p: { xs: 2.2, md: 2.5 },
                    display: "grid",
                    gap: { xs: 2, md: 2.25 },
                  }}
                >
                  <Box
                    component="img"
                    src={iusatLogo}
                    alt="IUSAT"
                    sx={{
                      height: { xs: 100, md: 160 },
                      width: "auto",
                      mx: "auto",
                      display: "block",
                      filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.10))",
                    }}
                  />

                  <Box sx={{ display: "grid", placeItems: "center" }}>
                    <Box
                      sx={{
                        width: { xs: 64, md: 76 },
                        height: { xs: 64, md: 76 },
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background:
                          "linear-gradient(180deg, rgba(11,111,115,1) 30%, rgba(44, 121, 197, 1) 100%)",
                        boxShadow: "0 22px 46px rgba(11,111,115,0.22)",
                      }}
                    >
                      <HandshakeRoundedIcon
                        sx={{ fontSize: { xs: 30, md: 34 }, color: "#fff" }}
                      />
                    </Box>
                  </Box>

                  <Box
                    component="img"
                    src={unescoLogo}
                    alt="UNESCO"
                    sx={{
                      height: { xs: 70, md: 110 },
                      width: "auto",
                      mx: "auto",
                      display: "block",
                      filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.10))",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    sx={{
                      height: 30,
                      px: 1.2,
                      borderRadius: 999,
                      display: "inline-flex",
                      alignItems: "center",
                      background: "rgba(11,111,115,0.08)",
                      border: "1px solid rgba(11,111,115,0.14)",
                      color: "#0B6F73",
                      fontWeight: 900,
                      fontSize: 12.5,
                      textAlign: "center",
                    }}
                  >
                    {t("cards.unesco.pill")}
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* RIGHT: Other Partners */}
        <Box sx={{ flex: { xs: 3, md: 7 } }}>
          <Stack spacing={2.5}>
            {/* 2 - ENSAC */}
            <Card
              sx={{
                borderRadius: 2,
                p: 2,
                background: "rgba(255, 255, 255, 0.72)",
                border: "3px solid #0B6F73",
                cursor: "pointer",
                transition:
                  "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease",
                "&:hover": {
                  borderColor: "rgba(11,111,115,0.18)",
                  background: "rgba(255,255,255,0.82)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                },
              }}
              onClick={() =>
                window.open(
                  "https://www.univ-grenoble-alpes.fr/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <CardContent
                sx={{
                  p: { xs: 2.5, md: 3 },
                  "&:last-child": { pb: { xs: 2.5, md: 3 } },
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: isRTL ? "row-reverse" : "row",
                  },
                  gap: 2.5,
                  alignItems: { xs: "flex-start", sm: "center" },
                }}
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
                  2
                </Box>

                <Box
                  sx={{
                    width: { xs: "40px", sm: "8px" },
                    height: { xs: "6px", sm: "50px" },
                    borderRadius: 4,
                    background:
                      "linear-gradient(180deg, #0b6f73 0%, #2cc5b9 100%)",
                    flexShrink: 0,
                    alignSelf: { xs: "center", sm: "auto" },
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

                <Box
                  component="img"
                  src={ucalogo}
                  alt="UGA Logo"
                  sx={{
                    height: { xs: 50, md: 80 },
                    width: "auto",
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
                cursor: "pointer",
                transition:
                  "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease",
                "&:hover": {
                  borderColor: "rgba(11,111,115,0.18)",
                  background: "rgba(255,255,255,0.82)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                },
              }}
              onClick={() =>
                window.open(
                  "https://www.uniroma1.it/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <CardContent
                sx={{
                  p: { xs: 2.5, md: 3 },
                  "&:last-child": { pb: { xs: 2.5, md: 3 } },
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: isRTL ? "row-reverse" : "row",
                  },
                  gap: 2.5,
                  alignItems: { xs: "flex-start", sm: "center" },
                }}
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
                    width: { xs: "40px", sm: "8px" },
                    height: { xs: "6px", sm: "50px" },
                    borderRadius: 4,
                    background:
                      "linear-gradient(180deg, #0b6f73 0%, #2cc5b9 100%)",
                    flexShrink: 0,
                    alignSelf: { xs: "center", sm: "auto" },
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

                <Box
                  component="img"
                  src={saplogo}
                  alt="Sapienza Logo"
                  sx={{
                    height: { xs: 50, md: 80 },
                    width: "auto",
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
                transition:
                  "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background 220ms ease",
                "&:hover": {
                  borderColor: "rgba(11,111,115,0.18)",
                  background: "rgba(255,255,255,0.82)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 2.5, md: 3 },
                  "&:last-child": { pb: { xs: 2.5, md: 3 } },
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: isRTL ? "row-reverse" : "row",
                  },
                  gap: 2.5,
                  alignItems: { xs: "flex-start", sm: "center" },
                }}
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
                    width: { xs: "40px", sm: "8px" },
                    height: { xs: "6px", sm: "50px" },
                    borderRadius: 4,
                    background:
                      "linear-gradient(180deg, #0b6f73 0%, #2cc5b9 100%)",
                    flexShrink: 0,
                    alignSelf: { xs: "center", sm: "auto" },
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

                <Box
                  component="img"
                  src={ihslogo}
                  alt="IHS Logo"
                  sx={{
                    height: { xs: 50, md: 80 },
                    width: "auto",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </SectionShell>
  );
}
