import { AtlasApiService } from './api/atlas-api/atlas-api.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }]
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }]
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }]
      }
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private atlasApiService: AtlasApiService) {
    this.dataSource.data = TREE_DATA;
  }
  title = 'Atlas';

  headerConfig: { logo: string; url: string };
  messages = {};
  styles;

  shownLayers = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );
  // tslint:disable-next-line: variable-name
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level
    };
  };

  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  // tslint:disable-next-line: member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // tslint:disable-next-line: variable-name

  ngOnInit() {
    this.atlasApiService.getMessages().subscribe(m => {
      this.messages = m;
    });

    this.atlasApiService.getAppSettings().subscribe(appSettings => {
      this.headerConfig = appSettings.headerConfig;
      this.styles = appSettings.googleMapStyles;
    });
  }

  onMapReady($event) {
    console.log('onMapReady', $event);
  }

  onStatusChange($event) {
    console.log('onStatusChange', $event);
  }

  dropLayer(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.shownLayers, event.previousIndex, event.currentIndex);
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
