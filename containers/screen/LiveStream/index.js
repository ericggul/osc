import * as S from "./styles";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";

import useSocket from "utils/hooks/sockets/screen/useSocketLiveStream";
import useResize from "utils/hooks/useResize";
import useRandomInterval from "utils/hooks/useRandomInterval";

import { useSpring } from "react-spring";
import * as easings from "d3-ease";

import { RANDOM_NAMES } from "./names";

const ARRAY_LEFT = ["Activated CO2 in %", "Care hours attended", "Blood-nitrogen in %", "Love given in Hearts", "OSC per capita"];

const getRandom = (a, b) => Math.random() * (b - a) + a;
const getRandomInt = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);

export default function Comp() {
  const [windowWidth, windowHeight] = useResize();

  const [valA, setValA] = useState(63);
  const [valB, setValB] = useState(12308);
  const [valC, setValC] = useState(3.4);
  const [valD, setValD] = useState(324589);
  const [valE, setValE] = useState(437);

  useRandomInterval(
    () => {
      if (Math.random() < 0.15) setValA((prev) => Math.max(prev + getRandom(-0.01, 0.01) * 63, 0));
      if (Math.random() < 0.1) setValB((prev) => Math.max(prev + getRandomInt(0, 2), 0));
      if (Math.random() < 0.2) setValC((prev) => Math.max(prev + getRandom(-0.01, 0.01) * 3.4, 0));
      if (Math.random() < 0.2) setValD((prev) => Math.max(prev + getRandomInt(0, 2), 0));
      if (Math.random() < 0.1) setValE((prev) => Math.max(prev + getRandom(-0.001, 0.01) * 437, 0));
    },
    10,
    300
  );
  //socket
  const socket = useSocket({
    handleNewHeart,
    handleNewLiveStreamNumber,
    handleNewPageLocation,
  });

  const [heartEls, setHeartEls] = useState([]);
  function handleNewHeart(data) {
    setHeartEls((prev) => [...prev, data]);
    setValD((prev) => prev + 1);
  }

  const [liveStream, setLiveStream] = useState(234);
  const liveStreamRef = useRef(234);
  useEffect(() => {
    liveStreamRef.current = liveStream;
  }, [liveStream]);
  //todo: enter and exit
  function handleNewLiveStreamNumber(data) {
    setLiveStream(data);
    //if livestream increased
    if (data > liveStreamRef.current) {
    } else {
    }
  }

  ///page management
  const [mobileLocationCheckRequested, setMobileLocationCheckRequested] = useState(false);

  const router = useRouter();
  function handleNewPageLocation(data) {
    setMobileLocationCheckRequested(false);
    router.push(data);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!socket.current) return;
      socket.current.emit("handle-screen-to-mobile-location-check-request");
      setMobileLocationCheckRequested(true);
    }, 600 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mobileLocationCheckRequested) {
      //wait for 10s, and then push to the waiting if no response
      const timeout = setTimeout(() => {
        router.push("/screen/waiting");
      }, 10 * 1000);
      return () => clearTimeout(timeout);
    }
  }, [mobileLocationCheckRequested]);

  return (
    <S.Container>
      <S.LogoContainer>
        <img src="/assets/images/logo-small.svg" alt="logo" />
      </S.LogoContainer>

      <S.VideoContainer>
        {new Array(9).fill(0).map((_, i) => (
          <S.SingleVideo key={i}>
            <video
              width={Math.max(windowWidth, (windowHeight * 16) / 9) / 3}
              height={Math.max(windowHeight, (windowWidth * 9) / 16) / 3}
              style={{
                width: Math.max(windowWidth, (windowHeight * 16) / 9) / 3,
                height: Math.max(windowHeight, (windowWidth * 9) / 16) / 3,
              }}
              src="/assets/videos/vid.mp4"
              type="video/mp4"
              autoPlay="autoplay"
              loop
              playsInline
              muted
              preload="auto"
              controls={false}
            />
          </S.SingleVideo>
        ))}
      </S.VideoContainer>

      <S.VideoUpper>
        <S.VideoUpperUpper>
          <S.Live>Live</S.Live>
          <img src="/assets/screen/Viewers.svg" />
          {liveStream}
        </S.VideoUpperUpper>

        <S.VideoUpperLower>
          <img src="/assets/screen/osc.svg" alt="osc" />
          543532
        </S.VideoUpperLower>
      </S.VideoUpper>

      <S.InformationBoard>
        <S.Title>
          <h1>Northeastern Urban Temperates</h1>
          <p>Live Output</p>
        </S.Title>
        <S.Arrays>
          <S.ArrayLeft>
            {ARRAY_LEFT.map((item, index) => (
              <S.ArrayItem key={index}>{item}</S.ArrayItem>
            ))}
          </S.ArrayLeft>
          <S.ArrayRight>
            {[valA.toFixed(1), valB.toFixed(0), valC.toFixed(2), valD.toFixed(0), valE.toFixed(0)].map((item, index) => (
              <S.ArrayItem key={index}>{item}</S.ArrayItem>
            ))}
          </S.ArrayRight>
        </S.Arrays>
      </S.InformationBoard>

      {heartEls.map((el, i) => (
        <SingleHeartEl key={i} startPos={el} socket={socket} />
      ))}
    </S.Container>
  );
}

function SingleHeartEl({ startPos }) {
  const [windowWidth, windowHeight] = useResize();

  const STATIC_POS = useMemo(() => {
    const initialPos = {
      x: startPos.x * windowWidth,
      y: startPos.y * windowHeight + 0.9 * windowHeight,
      rotation: startPos.rotation,
      scale: startPos.scale,
    };

    const targetPos = {
      x: startPos.x * windowWidth + getRandom(-getRandom(0.15, 0.1), getRandom(0.1, 0.15)) * windowWidth,
      y: startPos.y * windowHeight - getRandom(0.3, 0.7) * windowHeight,
      rotation: getRandom(-getRandom(0.2, 0.6), getRandom(0.5, 0.7)) * Math.PI,
      scale: getRandom(0.8, 1.4),
    };

    return {
      initialPos,
      targetPos,
    };
  }, [windowWidth, windowHeight, startPos]);

  const [pos, setPos] = useState(STATIC_POS.initialPos);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!STATIC_POS) return;
    const { initialPos, targetPos } = STATIC_POS;
    const x = initialPos.x + (targetPos.x - initialPos.x) * progress;
    const y = initialPos.y + (targetPos.y - initialPos.y) * progress;
    const rotation = initialPos.rotation + (targetPos.rotation - initialPos.rotation) * progress;
    const opacity = progress > 0.9 ? 1 - (progress - 0.9) * 10 : 1;
    const scale = initialPos.scale + (targetPos.scale - initialPos.scale) * progress;
    setPos({ x, y, rotation, opacity, scale });
  }, [STATIC_POS, progress]);

  useSpring({
    from: { progress: 0 },
    to: { progress: 1 },
    config: { duration: startPos.duration * 1.5, tension: startPos.tension, friction: startPos.friction },
    onChange: ({ value }) => {
      setProgress(value.progress);
    },
    onRest: () => {},
  });

  return (
    <S.SingleHeart
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) rotate(${pos.rotation}rad) scale(${pos.scale})
      `,
        opacity: pos.opacity,
      }}
    >
      <img src="/assets/icons/heart.svg" />
    </S.SingleHeart>
  );
}
