import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PortsModel } from 'src/app/_models/model';
import { MasterService } from 'src/app/_services/master.service';

@Component({
  selector: 'app-port-list',
  templateUrl: './port-list.component.html',
  styleUrls: ['./port-list.component.css']
})
export class PortListComponent implements OnInit {
  data: PortsModel[];
  isLoading = true;
  hasData:boolean;

  displayedColumns: string[] = ['id','portName','state','country', 'isActive', 'action'];

  dataSource: MatTableDataSource<PortsModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private masterServiec : MasterService) { 
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){    
    this.masterServiec.getPorts()
    .subscribe((res: any) =>{
      ////Response format - {status: 'success', message: Array(9)}
      if(res.status == "success"){
        this.data = JSON.parse(JSON.stringify( res.message));
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        if(this.dataSource.data.length>0){this.hasData = true;}
        else{this.hasData = false;}
        
      }
      else if(res.status == "failure"){
        this.dataSource = new MatTableDataSource(this.data);
        this.isLoading = false;
        if(this.dataSource.data.length>0){this.hasData = true;}
        else{this.hasData = false;}
      }
    });
  }
  
  ngAfterViewInit() {
    if(this.dataSource != null){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
