import { FlexCenterStyle, Inner, Appear } from "styles/common";
import * as C from "styles/common/color";
import styled from "styled-components";

export const Container = styled.div`
  ${Inner};
  // display: flex;
  // flex-direction: column;

  overflow-y: scroll;

  min-height: ${({ theme }) => theme.windowHeight * 1}px;
  transition: opacity 0.5s ease-in-out;

  animation: ${Appear} 1s ease-in-out both;
  animation-delay: 0.5s;
`;

export const Text = styled.div`
  margin-left: 20px;
  width: calc(100% - 40px);
  color: #f46d22;
  margin-top: 180px;

  h1 {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
  }

  p {
    font-weight: 500;
    font-size: 14px;
    font-style: italic;
  }
`;

export const LiveStream = styled.div`
  margin-left: 20px;
  margin-top: 14px;
  width: calc(100% - 40px);
  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    font-family: Newsreader;
    color: #f46d22;
    margin-bottom: 4px;
  }
`;

export const LiveVideoEl = styled.div`
  width: 100%;
  height: ${({ theme }) => ((Math.min(theme.windowWidth, 768) - 40) * 9) / 16}px;
  position: relative;

  background: rgba(9, 9, 9, 0.6);

  video {
    width: 100%;
    height: 100%;
  }
`;

export const VideoUpper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 9px;
  left: 9px;

  img {
    width: 16px;
    margin-left: 6px;
    margin-right: 3px;
  }
  font-size: 12px;
`;

export const Live = styled.div`
  width: 60px;
  height: 25px;
  ${FlexCenterStyle};

  background: #f02626;
  border-radius: 6px;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #fff0e8;
`;

export const TapZone = styled.div`
  ${FlexCenterStyle};
  cursor: pointer;

  margin-top: 0;

  width: 100%;
  position: relative;
  height: ${({ theme }) => ((Math.min(theme.windowWidth, 768) - 40) * 9) / 16}px;

  font-family: Newsreader;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #f46d22;

  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;
`;

export const ButtonZone = styled.div`
  width: calc(100% - 70px);
  margin-left: 35px;
  position: relative;
  ${FlexCenterStyle};
  flex-direction: column;
  margin-bottom: 40px;

  p {
    font-style: italic;
    font-weight: 500;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    color: rgba(244, 109, 34, 0.5);
    margin-top: 2px;
  }
`;

export const Button = styled.div`
  width: 100%;
  cursor: pointer;

  border-radius: 10px;
  font-family: Newsreader;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  ${FlexCenterStyle};
  height: 40px;

  color: #f46d22;

  border: 1px solid #f46d22;

  ${({ completed }) => completed && `background: #F46D22; color: #fff;`}
  transition: all 0.5s ease-in-out;
`;

export const SingleHeart = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: 700;
  width: 40px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;
