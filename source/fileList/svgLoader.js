import { EventListener } from '../utility/eventListener/eventListener'

/**
   * svgElementを読み込むクラス。
   * @param {HTMLInputElement} TargetFile -inputから受け取ったデータを入力(event.target.files[0]);
   */
export class SvgLoader {
  rawData;
  url;
  svgElements;

  constructor(TargetFile = null) {
    this.rawData = TargetFile;
    this.url = URL.createObjectURL(this.rawData);

    this.loadSVG();
  }

  loadSVG() {
    if(this.rawData == null) {
      throw new Error('rawDataの値が入力されていません。')
    }

    this.svgElements = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(this.url);
        const data = await response.text();
        const parser = new DOMParser(); // DOMParserを作成
        const svgDoc = parser.parseFromString(data, 'image/svg+xml'); // SVGデータを解析
        resolve(svgDoc.querySelector('svg'));
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
  }
}

/**
   * inputタグを使用可能な状態にします。
   * @param {HTMLInputElement | string} selector -inputタグを直接渡すか、id名を書いてください。
   */
export class SvgButton {
  inputElement;

  #svgLoader;
  svgElements;

  #eventListener;

  constructor(selector) {
    this.#eventListener = new EventListener();

    if (typeof selector === 'string') {
      this.inputElement = document.querySelector(selector);
    } else {
      this.inputElement = selector;
    }

    this.inputElement.addEventListener('change', async (event) => {
      console.log("アップロード成功");
      this.#svgLoader = new SvgLoader(event.target.files[0]);
      event.target.value = null;
      this.svgElements = new Promise(async (resolve, reject) => {
        
        try {
          const result = await this.#svgLoader.svgElements;
          resolve(result);
          this.#eventListener.dispatch('svgLoaded', result);
        } catch (error) {
          reject(error);
        }
      })
    })
  }

  get svgLoader() {
    return this.#svgLoader;
  }

  get eventListener() {
    return this.#eventListener;
  }

  /**
   * svgElementを読み込むクラス。
   * @param {string | svgLoaded} name -現状svgLoaded以外にイベントはありません。
   * @param {(svgElements) =>} callback -任意のコールバック関数を入力してください。()内にはsvgElementsが渡されます。
   */
  addEventListener(name, callback) {
    if(name != 'svgLoaded') throw new Error('該当するイベント名はありません。');
    this.#eventListener.add(name, callback, this);
  }
}

/**
   * svgElementsから位置情報や大きさなどを取り出すクラス。
   * @param {svgElements} svgElements -svgLoaderクラスで取り出したsvgElementsを入れてください。
   * @param {center | left} svgElements -座標の読み込み基準を決められます。
   */
export class SvgCircleAnalyzer {
  svgElements;
  svgCircleElements;
  svgViewBoxSize;

  circles;

  constructor(svgElements, mode = 'left') {
    if (mode != 'center' && mode != 'left') {
      throw new Error('ReferenceModeに渡された値が不正です。centerもしくはleftを渡してください');
    }

    this.svgElements = svgElements

    const viewBoxValues = this.svgElements.getAttribute('viewBox').split(' ').map((param) => +param);
    this.svgViewSize = {
      width: viewBoxValues[2],
      height: viewBoxValues[3],
    }

    this.circles = [];
    const circleElements = this.svgElements.querySelectorAll('circle');
    for(const circleElement of circleElements) {
      let circle = {
        position: {
          x: null,
          y: null,
        },
        radius: null,
        fill: null,
        strokeColor: null,
        strokeWeight: null,
      }

      switch (mode) {
        case 'left':
          circle.position.x = parseFloat(circleElement.getAttribute('cx'));
          circle.position.y = parseFloat(circleElement.getAttribute('cy'));
          break;
        case 'center':
          circle.position.x = parseFloat(circleElement.getAttribute('cx') - this.svgViewSize.width / 2);
          circle.position.y = parseFloat(circleElement.getAttribute('cy') - this.svgViewSize.height / 2);
          break;
      }

      circle.radius = parseFloat(circleElement.getAttribute('r'));
      circle.fill = circleElement.getAttribute('fill'); //数値に直す必要がないので注意
      circle.strokeColor = circleElement.getAttribute('stroke');
      circle.strokeWeight = parseFloat(circleElement.getAttribute('stroke-width'));

      this.circles.push(circle);
    }
  }

  /**
   * 読み込んだcirclesの配列の長さを取得する。
   */
  getLength() {
    return this.circles.length;
  }

  /**
   * 読み込んだsvgファイルのキャンパスサイズを取得する。
   */
  getViewSize() {
      return this.svgViewSize;
  }

  /**
   * 特定のcircleの情報だけを取得する。
   */
  getCircleElement(i) {
      return this.circles[i];
  }

  /**
   * 読み込んだsvgの情報を配列として書き出すことができる。
   */
  getArray() {
      return this.circles;
  }
}