import produce from "immer";
import create from "zustand";
import shallow from "zustand/shallow";

import Head from "next/head";
import styles from "../styles/Builder.module.css";
import canvasStyles from "../styles/Canvas.module.css";
import contrStyles from "../styles/Controlls.module.css";

const [useFace] = create((set) => ({
  face: [
    {
      type: "shape",
      image: "./shape.png",
      position: [50, 50],
      offset: ["0px", "0px"],
      width: "340px",
      height: "500px",
      scale: [1, 1.4],
    },
    {
      type: "eyes",
      image: "./eye.png",
      symmetrical: true,
      position: [12, 55],
      offset: ["0px", "0px"],
      width: "50px",
      scale: [1.2, 1.2],
    },
    {
      type: "mouth",
      image: "./mouth.png",
      position: [50, 85],
      offset: ["0px", "0px"],
      width: "291px",
      width: "260px",
      scale: [0.3, 0.5],
    },
    {
      type: "nose",
      image: "./nose.png",
      position: [50, 60],
      offset: ["0px", "0px"],
      width: "217px",
      height: "310px",
      scale: [0.3, 0.5],
    },
  ],

  set: (fn) => set(produce(fn)),
}));

const Eyes = ({
  image,
  position,
  offset,
  scale,
  width,
  height,
  symmetrical,
}) => {
  if (!symmetrical) {
    const vars = {
      "--width": width,
      "--height": height ?? width,

      "--position-x": position[0] + "%",
      "--position-y": position[1] + "%",

      "--offset-x": offset[0],
      "--offset-y": offset[1],

      "--scale-x": scale[0],
      "--scale-y": scale[1],
    };

    return <img src={image} className={canvasStyles.part} style={vars} />;
  }

  var one = {
    "--width": width,
    "--height": height,

    "--position-x": 50 - position[0] + "%",
    "--position-y": position[1] + "%",

    "--offset-x": offset[0],
    "--offset-y": offset[1],

    "--scale-x": scale[0],
    "--scale-y": scale[1],
  };
  var two = {
    "--width": width,
    "--height": height,

    "--position-x": 50 + position[0] + "%",
    "--position-y": position[1] + "%",

    "--offset-x": offset[0],
    "--offset-y": offset[1],

    "--scale-x": -scale[0],
    "--scale-y": scale[1],
  };

  return (
    <>
      <img src={image} className={canvasStyles.part} style={one} />

      <img src={image} className={canvasStyles.part} style={two} />
    </>
  );
};

const picFacePart = (type) => {
  const map = {
    eyes: Eyes,
    nose: Eyes,
    mouth: Eyes,
    shape: Eyes,
  };
  return map[type];
};

const picControll = (type) => {
  const map = {
    eyes: EyesC,
    nose: Nose,
    mouth: Mouth,
    shape: Shape,
  };

  return map[type];
};

const Canvas = ({ parts }) => {
  return (
    <div className={canvasStyles.canvas}>
      {parts
        .map((part) => [picFacePart(part.type), part])
        .map(([Component, props], index) => (
          <Component key={index} {...props} />
        ))}
    </div>
  );
};

const Shape = ({ scale }) => {
  const set = useFace((store) => store.set);
  const [x, y] = scale;

  return (
    <div className={contrStyles.controll}>
      <div>Face shape</div>

      <label>
        Width:
        <input
          type="range"
          value={x}
          min={0}
          max={2}
          step={0.01}
          onChange={(e) =>
            set((state) => {
              state.face[0].scale[0] = parseFloat(e.target.value);
            })
          }
        />
      </label>

      <label>
        Height:
        <input type="range" value={y} min={0} max={2} step={0.01}
          onChange={(e) =>
            set((state) => {
              state.face[0].scale[1] = parseFloat(e.target.value);
            })
          } />
      </label>
    </div>
  );
};

const Mouth = ({ scale, position }) => {
  const set = useFace((store) => store.set);
  const [x, y] = scale;
  const [, pos] = position;

  return (
    <div className={contrStyles.controll}>
      <div>Mouth</div>

      <label>
        Position:
        <input
          type="range"
          value={pos}
          min={0}
          max={100}
          step={1}
          onChange={(e) =>
            set((state) => {
              state.face[2].position[1] = Number(e.target.value);
            })
          }
        />
      </label>

      <label>
        Width:
        <input
          type="range"
          value={x}
          min={0}
          max={2}
          step={0.01}
          onChange={(e) =>
            set((state) => {
              state.face[2].scale[0] = parseFloat(e.target.value);
            })
          }
        />
      </label>

      <label>
        Height:
        <input type="range" value={y} min={0} max={2} step={0.01}
          onChange={(e) =>
            set((state) => {
              state.face[2].scale[1] = parseFloat(e.target.value);
            })
          } />
      </label>
    </div>
  );
};

const Nose = ({ scale, position }) => {
  const set = useFace((store) => store.set);
  const [x, y] = scale;
  const [, pos] = position;

  return (
    <div className={contrStyles.controll}>
      <div>Nose</div>

      <label>
        Position:
        <input
          type="range"
          value={pos}
          min={0}
          max={100}
          step={1}
          onChange={(e) =>
            set((state) => {
              state.face[3].position[1] = Number(e.target.value);
            })
          }
        />
      </label>

      <label>
        Width:
        <input
          type="range"
          value={x}
          min={0}
          max={2}
          step={0.01}
          onChange={(e) =>
            set((state) => {
              state.face[3].scale[0] = parseFloat(e.target.value);
            })
          }
        />
      </label>

      <label>
        Height:
        <input type="range" value={y} min={0} max={2} step={0.01}
          onChange={(e) =>
            set((state) => {
              state.face[3].scale[1] = parseFloat(e.target.value);
            })
          } />
      </label>
    </div>
  );
};

const EyesC = ({ scale, position }) => {
  const set = useFace((store) => store.set);
  const [x, y] = scale;
  const [posx, posy] = position;

  return (
    <div className={contrStyles.controll}>
      <div>Nose</div>
    
      <label>
        Position:
        <input
          type="range"
          value={posy}
          min={0}
          max={100}
          step={1}
          onChange={(e) =>
            set((state) => {
              state.face[1].position[1] = Number(e.target.value);
            })
          }
        />
      </label>

      <label>
        Distance:
        <input
          type="range"
          value={posx}
          min={5}
          max={45}
          step={1}
          onChange={(e) =>
            set((state) => {
              state.face[1].position[0] = Number(e.target.value);
            })
          }
        />
      </label>

      <label>
        Width:
        <input
          type="range"
          value={x}
          min={0}
          max={2}
          step={0.01}
          onChange={(e) =>
            set((state) => {
              state.face[1].scale[0] = parseFloat(e.target.value);
            })
          }
        />
      </label>

      <label>
        Height:
        <input type="range" value={y} min={0} max={2} step={0.01}
          onChange={(e) =>
            set((state) => {
              state.face[1].scale[1] = parseFloat(e.target.value);
            })
          } />
      </label>
    </div>
  );
};


const Controlls = ({ parts }) => {
  return (
    <div className={contrStyles.container}>
      {parts
        .map((part) => [picControll(part.type), part])
        .map(([Component, props], index) => (
          <Component key={index} {...props} />
        ))}
    </div>
  );
};

export default function Builder() {
  const face = useFace((store) => store.face, shallow);

  return (
    <div className={styles.container}>
      <Head>
        <title>Redach</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <nav>навбар</nav> */}

      <aside>
        <Controlls parts={face}></Controlls>
      </aside>

      <main>
        <Canvas parts={face} />
      </main>
    </div>
  );
}
