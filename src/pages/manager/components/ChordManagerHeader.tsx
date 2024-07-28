import React, { ReactElement } from 'react';

export function ChordManagerHeader(): ReactElement {
  return (
    <div className="flex flex-wrap w-full mb-20">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white font-mono">
          Device Manager
        </h1>
      </div>
      <p>
        NOTE: This site is deprecated. You should only use it if you are pre-CCOS and are 
        updating your device to CCOS. Afterwards, you should use the new <a href="https://manager.charachorder.com/config/layout/">Device Manager.</a>
        See <a href="https://docs.charachorder.com/CCOS.html#upgrade-to-ccos">the documentation</a> for more details on upgrading to CCOS.
      </p>
      <p className="lg:w-1/2 w-full leading-relaxed text-gray-300 font-semibold font-mono">
        Welcome to the Device Manager. Here you can exercise control over the
        layout and chord library of your chording enabled device.
      </p>
    </div>
  );
}
