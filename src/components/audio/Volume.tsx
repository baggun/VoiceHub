import { audioState, audioVolumeState } from "@/recoil/audio/atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { RootState } from "@modules/index";
// import { changeVolume } from "@modules/audio";

const Volume = () => {
  const [audio, setAudio] = useRecoilState(audioState);
  const [volume, setVolume] = useRecoilState(audioVolumeState);
  // const dispatch = useDispatch();
  // const { audioVolume } = useSelector(
  //     (state: RootState) => ({
  //         audioVolume: state.audio.volume,
  //     }),
  //     shallowEqual
  // );

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = +e.target.value;

    if (newVolume) {
      // dispatch(changeVolume(newVolume));
    }
  };

  const changeVolume = (newVolume: number) => {
    if (audio.waveRef) audio.waveRef.setVolume(newVolume);
    // if (audio.ref) audio.ref.volume = newVolume;
    // setAudio({ ...audio, volume: newVolume });
    setVolume(newVolume);
  };

  function inputRangeHandler(e: any) {
    const per = e.target.value * 100;
    e.target.style.background = `linear-gradient(to right, #fff 0%, #fff ${per}%, #ffffff4c ${per}%, #ffffff4c 100%)`;
  }

  return (
    <VolumDiv>
      <VolumeController
        min={0}
        max={1}
        color="gray"
        step={0.01}
        value={volume}
        onInput={inputRangeHandler}
        onChange={onVolumeChange}
      />
    </VolumDiv>
  );
};

export default Volume;

const VolumDiv = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translate(0px, -50%);
`;

const VolumeController = styled.input.attrs({
  type: "range",
})`
  height: 7px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  border-radius: 0.3em;
  transition: 450ms ease-in;
  background: linear-gradient(to right, #fff 0%, #fff 100%);
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 1px #ffffff;
    // background: #FFFFFF;
    border-radius: 50px;
    border: 0px solid #000000;
  }
  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 5px #0000008f;
    border: 0px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -4.5px;
  }
  &:focus::-webkit-slider-runnable-track {
    // background: #FFFFFF;
  }
  &::-moz-range-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 5x #0000007f;
    // background: #FFFFFF;
    border-radius: 50px;
    border: 0px solid #000000;
  }
  &::-moz-range-thumb {
    box-shadow: 0px 0px 5px #0000008f;
    border: 0px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background: #ffffff;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #ffffff;
    border: 0px solid #000000;
    border-radius: 100px;
    box-shadow: 0px 0px 1px #ffffff;
  }
  &::-ms-fill-upper {
    background: #ffffff;
    border: 0px solid #000000;
    border-radius: 100px;
    box-shadow: 0px 0px 1px #ffffff;
  }
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 5px #0000008f;
    border: 0px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background: #ffffff;
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: #ffffff;
  }
  &:focus::-ms-fill-upper {
    background: #ffffff;
  }
`;
