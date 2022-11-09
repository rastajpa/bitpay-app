import React from 'react';
import {Path, Svg, G} from 'react-native-svg';
import {useTheme} from 'styled-components/native';
import {White} from '../../../../styles/colors';

const MoonpayIconSvg: React.FC<{
  width: number;
  height: number;
}> = ({width, height}) => {
  return (
    <Svg
      viewBox={'0 0 200 200'}
      height={height}
      width={width}
      id="moonpay-svg-icon">
      <G transform="translate(0,10) scale(0.55)" id="g12">
        <Path
          id="moonpay-path-icon"
          fill="#7d00ff"
          d="M263.5879,95.7848a47.8924,47.8924,0,1,0-47.8924-47.8924,47.8894,47.8894,0,0,0,47.8924,47.8924M116.7378,311.48A116.7378,116.7378,0,1,1,233.4755,194.7426,116.7343,116.7343,0,0,1,116.7378,311.48"
        />
      </G>
    </Svg>
  );
};

const MoonpayLogoSvg: React.FC<{
  isDark: boolean;
  width: number;
  height: number;
}> = ({isDark, width, height}) => {
  return (
    <Svg
      viewBox={'0 0 500 200'}
      height={height}
      width={width}
      id="moonpay-svg-logo">
      <G transform="translate(-70,50) scale(0.25)" stroke="none">
        <Path
          id="moonpay-path-logo"
          fill={isDark ? White : '#061027'}
          d="M1790.3713,287.4864l-72-165.3885h48.2118l49.1715,118.6136,56.83-118.6136H1920L1807.93,349.9062h-48.21Zm-175.32-34.2431a49.2341,49.2341,0,0,0,12.2126-4.55,50.4373,50.4373,0,0,0,10.2969-7.2636,44.2472,44.2472,0,0,0,7.9821-9.7382,49.8076,49.8076,0,0,0,5.2682-12.1327,51.23,51.23,0,0,0,1.9156-14.2879,51.8727,51.8727,0,0,0-1.9156-14.4476,49.8446,49.8446,0,0,0-5.2682-12.1327,46.0367,46.0367,0,0,0-7.9821-9.8179,44.727,44.727,0,0,0-10.2969-7.1839,53.6932,53.6932,0,0,0-12.2126-4.39,59.9968,59.9968,0,0,0-13.5695-1.5166,58.9546,58.9546,0,0,0-13.49,1.5166,52.4489,52.4489,0,0,0-12.0529,4.39,47.072,47.072,0,0,0-10.2968,7.1839,44.863,44.863,0,0,0-8.062,9.8179,47.6809,47.6809,0,0,0-5.1883,12.1327,54.01,54.01,0,0,0-1.8358,14.4476,53.338,53.338,0,0,0,1.8358,14.2879,47.6473,47.6473,0,0,0,5.1883,12.1327,43.1644,43.1644,0,0,0,8.062,9.7382,53.4525,53.4525,0,0,0,10.2968,7.2636,48.1135,48.1135,0,0,0,12.0529,4.55,58.7383,58.7383,0,0,0,13.49,1.5166,59.7753,59.7753,0,0,0,13.5695-1.5166M1566.44,290.28a86.9782,86.9782,0,0,1-21.1524-8.461,80.7184,80.7184,0,0,1-30.8907-30.97,88.24,88.24,0,0,1-8.461-21.3121,101.82,101.82,0,0,1,0-48.6906,86.8165,86.8165,0,0,1,8.461-21.2323,81.2442,81.2442,0,0,1,30.8907-30.8906,87.0544,87.0544,0,0,1,21.1524-8.461,96.2757,96.2757,0,0,1,24.1857-2.9534,105.1432,105.1432,0,0,1,13.17.7982,80.3745,80.3745,0,0,1,11.8932,2.3946,89.1663,89.1663,0,0,1,10.6162,3.7516,67.2472,67.2472,0,0,1,9.339,4.8691,49.43,49.43,0,0,1,7.8225,6.0663,61.9191,61.9191,0,0,1,6.226,6.8646V122.0979h45.817V288.4442h-45.817V268.4891a60.5571,60.5571,0,0,1-9.9776,9.8977,61.7838,61.7838,0,0,1-13.33,7.9821,76.0354,76.0354,0,0,1-16.523,5.1085,100.699,100.699,0,0,1-19.2368,1.7561A96.2757,96.2757,0,0,1,1566.44,290.28M1400.1059,164.2433a74.1547,74.1547,0,0,0,19.4763-2.235,35.3578,35.3578,0,0,0,13.5695-6.7848,26.9589,26.9589,0,0,0,7.982-11.2547,43.3426,43.3426,0,0,0,2.5543-15.4852,42.7084,42.7084,0,0,0-2.5543-15.4054,26.4833,26.4833,0,0,0-7.982-11.0951,36.0935,36.0935,0,0,0-13.5695-6.7049,74.32,74.32,0,0,0-19.4763-2.235H1355.087v71.2ZM1307.6736,53.7714h96.9022q22.83,0,39.5911,5.5875t27.6181,15.4852a61.7755,61.7755,0,0,1,16.2035,23.7866,82.8034,82.8034,0,0,1,5.348,30.0125,81.3516,81.3516,0,0,1-5.348,29.9328,62.8287,62.8287,0,0,1-16.2035,23.6269q-10.8567,9.98-27.6181,15.565-16.7622,5.5915-39.5911,5.5875H1355.087v85.0888h-47.4134Zm-203.5967,68.3265h45.4978v19.9552a51.7593,51.7593,0,0,1,9.8978-10.2969,62.4563,62.4563,0,0,1,12.9309-7.8224,70.38,70.38,0,0,1,15.8844-4.9489,97.3754,97.3754,0,0,1,18.4385-1.6762,79.08,79.08,0,0,1,28.2566,4.7892,58.2737,58.2737,0,0,1,21.3919,13.809,59.5951,59.5951,0,0,1,13.41,22.27,89.619,89.619,0,0,1,4.6294,29.6933v100.574h-45.4977V199.6836a61.65,61.65,0,0,0-2.7139-19.1569,38.2125,38.2125,0,0,0-7.7426-13.8888,31.399,31.399,0,0,0-12.3722-8.3812,46.9658,46.9658,0,0,0-16.7623-2.7937,47.6271,47.6271,0,0,0-16.8422,2.7937,31.3,31.3,0,0,0-12.452,8.3812,38.21,38.21,0,0,0-7.7426,13.8888,61.6464,61.6464,0,0,0-2.714,19.1569v88.7606h-45.4978Zm-111.96,130.6665a57.3572,57.3572,0,0,0,12.5319-4.63,41.9084,41.9084,0,0,0,10.2968-7.4233,47.7127,47.7127,0,0,0,7.7425-9.8978,44.0626,44.0626,0,0,0,4.7893-11.9731,58.4644,58.4644,0,0,0,1.5964-13.8888,57.5039,57.5039,0,0,0-1.5964-13.809,45.0861,45.0861,0,0,0-12.5318-21.8708,46.9764,46.9764,0,0,0-10.2968-7.5032,50.4979,50.4979,0,0,0-12.5319-4.7094,62.9778,62.9778,0,0,0-14.4476-1.5964,62.2334,62.2334,0,0,0-14.2879,1.5964,49.0966,49.0966,0,0,0-12.452,4.7094,47.7362,47.7362,0,0,0-10.217,7.5032,41.54,41.54,0,0,0-7.583,9.8977A54.4441,54.4441,0,0,0,928.34,191.063a52.2305,52.2305,0,0,0-1.756,13.8888,53.3575,53.3575,0,0,0,1.756,13.8888,51.9043,51.9043,0,0,0,4.7893,11.9731,43.6254,43.6254,0,0,0,7.583,9.8978,42.4692,42.4692,0,0,0,10.217,7.4233,55.6358,55.6358,0,0,0,12.452,4.63,59.3674,59.3674,0,0,0,14.2879,1.6762,60.0757,60.0757,0,0,0,14.4476-1.6762M950.8492,290.2a107.7917,107.7917,0,0,1-23.7068-8.5408,87.3863,87.3863,0,0,1-19.556-13.33,81.6173,81.6173,0,0,1-14.687-17.64,83.8027,83.8027,0,0,1-9.3391-21.392,92.19,92.19,0,0,1,0-48.6906,82.54,82.54,0,0,1,9.3391-21.3121,84.3785,84.3785,0,0,1,14.687-17.64,85.9771,85.9771,0,0,1,19.556-13.41,107.9965,107.9965,0,0,1,23.7068-8.5408,121.5034,121.5034,0,0,1,53.9588,0,104.767,104.767,0,0,1,23.5471,8.5408,91.0054,91.0054,0,0,1,19.556,13.41,84.0413,84.0413,0,0,1,14.9264,17.64,81.05,81.05,0,0,1,9.4189,21.3121,92.1875,92.1875,0,0,1,0,48.6906,82.2766,82.2766,0,0,1-9.4189,21.392,81.3135,81.3135,0,0,1-14.9264,17.64,92.5883,92.5883,0,0,1-19.556,13.33,104.8355,104.8355,0,0,1-23.4673,8.5408,121.8583,121.8583,0,0,1-54.0386,0M773.31,252.7644a57.3171,57.3171,0,0,0,12.5319-4.63,41.9084,41.9084,0,0,0,10.2968-7.4233,47.72,47.72,0,0,0,7.7427-9.8978,43.9413,43.9413,0,0,0,4.7892-11.9731,58.47,58.47,0,0,0,1.5964-13.8888,57.5089,57.5089,0,0,0-1.5964-13.809,45.0831,45.0831,0,0,0-12.5319-21.8708,46.9764,46.9764,0,0,0-10.2968-7.5032,50.4666,50.4666,0,0,0-12.5319-4.7094,62.9775,62.9775,0,0,0-14.4475-1.5964,62.2447,62.2447,0,0,0-14.2879,1.5964,49.0973,49.0973,0,0,0-12.4521,4.7094,47.791,47.791,0,0,0-10.217,7.5032,41.5428,41.5428,0,0,0-7.583,9.8977,54.6382,54.6382,0,0,0-4.7892,11.8933,52.2263,52.2263,0,0,0-1.7561,13.8888,53.3532,53.3532,0,0,0,1.7561,13.8888,52.0786,52.0786,0,0,0,4.7892,11.9731,43.6282,43.6282,0,0,0,7.583,9.8978,42.5124,42.5124,0,0,0,10.217,7.4233,55.6367,55.6367,0,0,0,12.4521,4.63,59.3782,59.3782,0,0,0,14.2879,1.6762,60.0755,60.0755,0,0,0,14.4475-1.6762M732.0427,290.2A107.7909,107.7909,0,0,1,708.336,281.66a87.43,87.43,0,0,1-19.5561-13.33,81.6748,81.6748,0,0,1-14.687-17.64,83.799,83.799,0,0,1-9.339-21.392,92.1875,92.1875,0,0,1,0-48.6906,82.5359,82.5359,0,0,1,9.339-21.3121,84.44,84.44,0,0,1,14.687-17.64,86.02,86.02,0,0,1,19.5561-13.41,107.9957,107.9957,0,0,1,23.7067-8.5408,121.5034,121.5034,0,0,1,53.9588,0,104.73,104.73,0,0,1,23.5471,8.5408,90.9566,90.9566,0,0,1,19.5561,13.41,83.988,83.988,0,0,1,14.9265,17.64,80.9909,80.9909,0,0,1,9.4188,21.3121,92.19,92.19,0,0,1,0,48.6906,82.2161,82.2161,0,0,1-9.4188,21.392,81.2637,81.2637,0,0,1-14.9265,17.64,92.5378,92.5378,0,0,1-19.5561,13.33A104.8355,104.8355,0,0,1,786.0813,290.2a121.8583,121.8583,0,0,1-54.0386,0M372.9434,53.7714h47.8924L502.7318,178.93,584.9472,53.7714H632.84V288.4442H585.4261V127.5257L517.4189,231.2926H488.3641L420.3569,127.5257V288.4442H372.9434Z"
        />
      </G>
    </Svg>
  );
};

const MoonpayLogo = ({
  widthIcon = 45,
  heightIcon = 45,
  widthLogo = 70,
  heightLogo = 30,
  iconOnly = false,
}: {
  widthIcon?: number;
  heightIcon?: number;
  widthLogo?: number;
  heightLogo?: number;
  iconOnly?: boolean;
}) => {
  const theme = useTheme();

  return (
    <>
      <MoonpayIconSvg width={widthIcon} height={heightIcon} />
      {!iconOnly && (
        <MoonpayLogoSvg
          isDark={theme.dark}
          width={widthLogo}
          height={heightLogo}
        />
      )}
    </>
  );
};

export default MoonpayLogo;

{
  /* <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="1920" height="349.9062" viewBox="0 0 1920 349.9062">
  <g id="MP_LOGO" data-name="MP LOGO">
    <path d="M1790.3713,287.4864l-72-165.3885h48.2118l49.1715,118.6136,56.83-118.6136H1920L1807.93,349.9062h-48.21Zm-175.32-34.2431a49.2341,49.2341,0,0,0,12.2126-4.55,50.4373,50.4373,0,0,0,10.2969-7.2636,44.2472,44.2472,0,0,0,7.9821-9.7382,49.8076,49.8076,0,0,0,5.2682-12.1327,51.23,51.23,0,0,0,1.9156-14.2879,51.8727,51.8727,0,0,0-1.9156-14.4476,49.8446,49.8446,0,0,0-5.2682-12.1327,46.0367,46.0367,0,0,0-7.9821-9.8179,44.727,44.727,0,0,0-10.2969-7.1839,53.6932,53.6932,0,0,0-12.2126-4.39,59.9968,59.9968,0,0,0-13.5695-1.5166,58.9546,58.9546,0,0,0-13.49,1.5166,52.4489,52.4489,0,0,0-12.0529,4.39,47.072,47.072,0,0,0-10.2968,7.1839,44.863,44.863,0,0,0-8.062,9.8179,47.6809,47.6809,0,0,0-5.1883,12.1327,54.01,54.01,0,0,0-1.8358,14.4476,53.338,53.338,0,0,0,1.8358,14.2879,47.6473,47.6473,0,0,0,5.1883,12.1327,43.1644,43.1644,0,0,0,8.062,9.7382,53.4525,53.4525,0,0,0,10.2968,7.2636,48.1135,48.1135,0,0,0,12.0529,4.55,58.7383,58.7383,0,0,0,13.49,1.5166,59.7753,59.7753,0,0,0,13.5695-1.5166M1566.44,290.28a86.9782,86.9782,0,0,1-21.1524-8.461,80.7184,80.7184,0,0,1-30.8907-30.97,88.24,88.24,0,0,1-8.461-21.3121,101.82,101.82,0,0,1,0-48.6906,86.8165,86.8165,0,0,1,8.461-21.2323,81.2442,81.2442,0,0,1,30.8907-30.8906,87.0544,87.0544,0,0,1,21.1524-8.461,96.2757,96.2757,0,0,1,24.1857-2.9534,105.1432,105.1432,0,0,1,13.17.7982,80.3745,80.3745,0,0,1,11.8932,2.3946,89.1663,89.1663,0,0,1,10.6162,3.7516,67.2472,67.2472,0,0,1,9.339,4.8691,49.43,49.43,0,0,1,7.8225,6.0663,61.9191,61.9191,0,0,1,6.226,6.8646V122.0979h45.817V288.4442h-45.817V268.4891a60.5571,60.5571,0,0,1-9.9776,9.8977,61.7838,61.7838,0,0,1-13.33,7.9821,76.0354,76.0354,0,0,1-16.523,5.1085,100.699,100.699,0,0,1-19.2368,1.7561A96.2757,96.2757,0,0,1,1566.44,290.28M1400.1059,164.2433a74.1547,74.1547,0,0,0,19.4763-2.235,35.3578,35.3578,0,0,0,13.5695-6.7848,26.9589,26.9589,0,0,0,7.982-11.2547,43.3426,43.3426,0,0,0,2.5543-15.4852,42.7084,42.7084,0,0,0-2.5543-15.4054,26.4833,26.4833,0,0,0-7.982-11.0951,36.0935,36.0935,0,0,0-13.5695-6.7049,74.32,74.32,0,0,0-19.4763-2.235H1355.087v71.2ZM1307.6736,53.7714h96.9022q22.83,0,39.5911,5.5875t27.6181,15.4852a61.7755,61.7755,0,0,1,16.2035,23.7866,82.8034,82.8034,0,0,1,5.348,30.0125,81.3516,81.3516,0,0,1-5.348,29.9328,62.8287,62.8287,0,0,1-16.2035,23.6269q-10.8567,9.98-27.6181,15.565-16.7622,5.5915-39.5911,5.5875H1355.087v85.0888h-47.4134Zm-203.5967,68.3265h45.4978v19.9552a51.7593,51.7593,0,0,1,9.8978-10.2969,62.4563,62.4563,0,0,1,12.9309-7.8224,70.38,70.38,0,0,1,15.8844-4.9489,97.3754,97.3754,0,0,1,18.4385-1.6762,79.08,79.08,0,0,1,28.2566,4.7892,58.2737,58.2737,0,0,1,21.3919,13.809,59.5951,59.5951,0,0,1,13.41,22.27,89.619,89.619,0,0,1,4.6294,29.6933v100.574h-45.4977V199.6836a61.65,61.65,0,0,0-2.7139-19.1569,38.2125,38.2125,0,0,0-7.7426-13.8888,31.399,31.399,0,0,0-12.3722-8.3812,46.9658,46.9658,0,0,0-16.7623-2.7937,47.6271,47.6271,0,0,0-16.8422,2.7937,31.3,31.3,0,0,0-12.452,8.3812,38.21,38.21,0,0,0-7.7426,13.8888,61.6464,61.6464,0,0,0-2.714,19.1569v88.7606h-45.4978Zm-111.96,130.6665a57.3572,57.3572,0,0,0,12.5319-4.63,41.9084,41.9084,0,0,0,10.2968-7.4233,47.7127,47.7127,0,0,0,7.7425-9.8978,44.0626,44.0626,0,0,0,4.7893-11.9731,58.4644,58.4644,0,0,0,1.5964-13.8888,57.5039,57.5039,0,0,0-1.5964-13.809,45.0861,45.0861,0,0,0-12.5318-21.8708,46.9764,46.9764,0,0,0-10.2968-7.5032,50.4979,50.4979,0,0,0-12.5319-4.7094,62.9778,62.9778,0,0,0-14.4476-1.5964,62.2334,62.2334,0,0,0-14.2879,1.5964,49.0966,49.0966,0,0,0-12.452,4.7094,47.7362,47.7362,0,0,0-10.217,7.5032,41.54,41.54,0,0,0-7.583,9.8977A54.4441,54.4441,0,0,0,928.34,191.063a52.2305,52.2305,0,0,0-1.756,13.8888,53.3575,53.3575,0,0,0,1.756,13.8888,51.9043,51.9043,0,0,0,4.7893,11.9731,43.6254,43.6254,0,0,0,7.583,9.8978,42.4692,42.4692,0,0,0,10.217,7.4233,55.6358,55.6358,0,0,0,12.452,4.63,59.3674,59.3674,0,0,0,14.2879,1.6762,60.0757,60.0757,0,0,0,14.4476-1.6762M950.8492,290.2a107.7917,107.7917,0,0,1-23.7068-8.5408,87.3863,87.3863,0,0,1-19.556-13.33,81.6173,81.6173,0,0,1-14.687-17.64,83.8027,83.8027,0,0,1-9.3391-21.392,92.19,92.19,0,0,1,0-48.6906,82.54,82.54,0,0,1,9.3391-21.3121,84.3785,84.3785,0,0,1,14.687-17.64,85.9771,85.9771,0,0,1,19.556-13.41,107.9965,107.9965,0,0,1,23.7068-8.5408,121.5034,121.5034,0,0,1,53.9588,0,104.767,104.767,0,0,1,23.5471,8.5408,91.0054,91.0054,0,0,1,19.556,13.41,84.0413,84.0413,0,0,1,14.9264,17.64,81.05,81.05,0,0,1,9.4189,21.3121,92.1875,92.1875,0,0,1,0,48.6906,82.2766,82.2766,0,0,1-9.4189,21.392,81.3135,81.3135,0,0,1-14.9264,17.64,92.5883,92.5883,0,0,1-19.556,13.33,104.8355,104.8355,0,0,1-23.4673,8.5408,121.8583,121.8583,0,0,1-54.0386,0M773.31,252.7644a57.3171,57.3171,0,0,0,12.5319-4.63,41.9084,41.9084,0,0,0,10.2968-7.4233,47.72,47.72,0,0,0,7.7427-9.8978,43.9413,43.9413,0,0,0,4.7892-11.9731,58.47,58.47,0,0,0,1.5964-13.8888,57.5089,57.5089,0,0,0-1.5964-13.809,45.0831,45.0831,0,0,0-12.5319-21.8708,46.9764,46.9764,0,0,0-10.2968-7.5032,50.4666,50.4666,0,0,0-12.5319-4.7094,62.9775,62.9775,0,0,0-14.4475-1.5964,62.2447,62.2447,0,0,0-14.2879,1.5964,49.0973,49.0973,0,0,0-12.4521,4.7094,47.791,47.791,0,0,0-10.217,7.5032,41.5428,41.5428,0,0,0-7.583,9.8977,54.6382,54.6382,0,0,0-4.7892,11.8933,52.2263,52.2263,0,0,0-1.7561,13.8888,53.3532,53.3532,0,0,0,1.7561,13.8888,52.0786,52.0786,0,0,0,4.7892,11.9731,43.6282,43.6282,0,0,0,7.583,9.8978,42.5124,42.5124,0,0,0,10.217,7.4233,55.6367,55.6367,0,0,0,12.4521,4.63,59.3782,59.3782,0,0,0,14.2879,1.6762,60.0755,60.0755,0,0,0,14.4475-1.6762M732.0427,290.2A107.7909,107.7909,0,0,1,708.336,281.66a87.43,87.43,0,0,1-19.5561-13.33,81.6748,81.6748,0,0,1-14.687-17.64,83.799,83.799,0,0,1-9.339-21.392,92.1875,92.1875,0,0,1,0-48.6906,82.5359,82.5359,0,0,1,9.339-21.3121,84.44,84.44,0,0,1,14.687-17.64,86.02,86.02,0,0,1,19.5561-13.41,107.9957,107.9957,0,0,1,23.7067-8.5408,121.5034,121.5034,0,0,1,53.9588,0,104.73,104.73,0,0,1,23.5471,8.5408,90.9566,90.9566,0,0,1,19.5561,13.41,83.988,83.988,0,0,1,14.9265,17.64,80.9909,80.9909,0,0,1,9.4188,21.3121,92.19,92.19,0,0,1,0,48.6906,82.2161,82.2161,0,0,1-9.4188,21.392,81.2637,81.2637,0,0,1-14.9265,17.64,92.5378,92.5378,0,0,1-19.5561,13.33A104.8355,104.8355,0,0,1,786.0813,290.2a121.8583,121.8583,0,0,1-54.0386,0M372.9434,53.7714h47.8924L502.7318,178.93,584.9472,53.7714H632.84V288.4442H585.4261V127.5257L517.4189,231.2926H488.3641L420.3569,127.5257V288.4442H372.9434Z"/>
  </g>
    <path id="MP_EM_LOGO" fill="#7d00ff" d="M263.5879,95.7848a47.8924,47.8924,0,1,0-47.8924-47.8924,47.8894,47.8894,0,0,0,47.8924,47.8924M116.7378,311.48A116.7378,116.7378,0,1,1,233.4755,194.7426,116.7343,116.7343,0,0,1,116.7378,311.48"/>
  </svg> */
}
