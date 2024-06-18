import { Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <>
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <a
        href="https://electrocart.onrender.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="/images/Adv2.gif"
          style={{ borderRadius: "0.5rem", margin: "0.75rem 0" }}
        />
      </a>
      <FlexBetween>
        <Typography color={main}>ᴇʟᴇᴄᴛƦᴏᴄᴀƦᴛ</Typography>
        <Typography color={medium}>
          <a
            href="https://electrocart.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            electrocart.com
          </a>
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your one-stop shop for the latest electronics. Find top-tier gadgets, from smartphones to laptops, all at unbeatable prices. Elevate your tech game with Electrocart.
      </Typography>
    </WidgetWrapper>
    <br />
    <WidgetWrapper>
        <FlexBetween>
          <Typography color={dark} variant="h5" fontWeight="500">
            Sponsored
          </Typography>
          <Typography color={medium}>Create Ad</Typography>
        </FlexBetween>
        <a
          href="https://movies-hub-ankur.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <img
            width="100%"
            height="auto"
            alt="advert"
            src="/images/Adv3.gif"
            style={{ borderRadius: "0.5rem", margin: "0.75rem 0" }}
          />
        </a>
        <FlexBetween>
          <Typography color={main}>𝐌𝐨𝐯𝐢𝐞𝐬 𝐇𝐮𝐛 </Typography>
          <Typography color={medium}>
            <a
              href="https://movies-hub-ankur.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              movieshub.com
            </a>
          </Typography>
        </FlexBetween>
        <Typography color={medium} m="0.5rem 0">
        Explore, review, and discuss the latest films. Join a vibrant community of movie enthusiasts sharing their cinematic insights.
        </Typography>
      </WidgetWrapper>
      <br/>
      
    <WidgetWrapper>
        <FlexBetween>
          <Typography color={dark} variant="h5" fontWeight="500">
            Sponsored
          </Typography>
          <Typography color={medium}>Create Ad</Typography>
        </FlexBetween>
        <a
          href="https://ankur-snapgram.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <img
            width="100%"
            height="auto"
            alt="advert"
            src="/images/Snapgram.gif"
            style={{ borderRadius: "0.5rem", margin: "0.75rem 0" }}
          />
        </a>
        <FlexBetween>
          <Typography color={main}>Snapgram </Typography>
          <Typography color={medium}>
            <a
              href="https://ankur-snapgram.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              snapgram.com
            </a>
          </Typography>
        </FlexBetween>
        <Typography color={medium} m="0.5rem 0">
        
Your ultimate social media hub. Connect with friends, share moments, and explore trending content. From stories to live streams, Snapgram has it all. Elevate your social experience with Snapgram.</Typography>
      </WidgetWrapper>
      </>
  );
};

export default AdvertWidget;
