import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as jsfc from 'js2flowchart';

@Component({
  selector: 'svg-render',
  templateUrl: './svg-render.component.html',
  styles: [`h1 { font-family: Lato; }`]
})
export class SvgRenderComponent implements OnInit {
  @Input() set code(val: string) {
    this._code = val;
  }

  protected _code: string = '';
  flowTreeBuilder: any = null;
  svgRender: any = null;
  svg: any = null;
  
  constructor(
    protected domSanitizer: DomSanitizer
  ) {
    const astParserConfig = {
      plugins: ['classProperties', 'decorators']
    };
    this.flowTreeBuilder = jsfc.createFlowTreeBuilder({astParser: astParserConfig});
    this.svgRender = jsfc.createSVGRender();
  }

  ngOnInit() {
    if (this._code) { 
      this.rerender();
    }
  }

  rerender() {
    if (!this._code) {
      return
    }
    console.log('rendering');
    const flowTree = this.flowTreeBuilder.build(this._code);
    const shapesTree = this.svgRender.buildShapesTree(flowTree);

    console.log('built trees', flowTree, shapesTree);
    this.setSvg(shapesTree);
  }

  setSvg(shapesTree: any) {
    const svg = shapesTree.print()
    this.svg = this.domSanitizer.bypassSecurityTrustHtml(svg.substr(svg.indexOf('<svg')));
  }

  
}

