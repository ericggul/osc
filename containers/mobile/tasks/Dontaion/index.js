import * as S from "./styles";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "foundations/tasks/Header";

import useSocket from "utils/hooks/sockets/useSocketMobile";

export default function Comp({ userName = "Cyan", plant, osc }) {
  const router = useRouter();
  const socket = useSocket({
    pageURL: "/screen/coming-soon",
  });

  function handleBackClick() {
    router.push(`/home?userName=${userName}&osc=${osc}&plant=${plant}`);
  }

  return (
    <S.Container>
      <Header
        color={"#A15326"}
        data={{
          name: "Follicle Donation",
          osc: 213,
        }}
        osc={osc}
        handleBackClick={handleBackClick}
      />
      <S.Text>
        <h1>Coming soon!</h1>
        <p>{`Your region’s collective growth efforts have made this option available`}</p>
      </S.Text>

      <S.ImageZone>
        <img src="/assets/tasks/donation-2.svg" />
      </S.ImageZone>

      <S.ButtonZone onClick={() => router.push(`/home?userName=${userName}&osc=${osc}&plant=${plant}`)}>
        <S.Button>{"Return Home"}</S.Button>
        <p>Nature access in your region grows with OSC </p>
      </S.ButtonZone>
    </S.Container>
  );
}
