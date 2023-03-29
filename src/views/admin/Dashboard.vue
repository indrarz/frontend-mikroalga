<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
 
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Main row -->
        <div class="row">
           <div class="col-12">
             <!-- interactive chart -->
             <div class="card card-primary card-outline">
               <div class="card-header">
                 <h3 class="card-title">
                   <i class="fas fa-tachometer-alt"></i>
                   Dashboard
                 </h3>
               </div>
               <div class="card-body text-center">
                <div class="row">
                 <div class="col-lg-4 col-sm-4">
                   <div class="col-sm-12">
                   <!-- Chart -->
                    <div class="small-box">
                      <!-- Header -->
                      <div class="card-body">
                        <h5 class="font-weight-bold">Jumlah Spesies Mikroalga</h5>
                        <pie-chart :data="graph_mikroalga"></pie-chart>
                        <br/>
                          <div class="col-sm-12">
                          <!-- Info -->
                              <h5 class="col-sm-12 font-weight-bold">{{jumlah_mikroalga}} Spesies</h5>
                          </div>
                      </div>
                    </div>
                   </div>
                 </div>

                 <div class="col-lg-4 col-sm-4">
                   <div class="col-sm-12">
                   <!-- Chart -->
                    <div class="small-box">
                      <!-- Header -->
                      <div class="card-body">
                        <h5 class="font-weight-bold">Jumlah Kolam</h5>
                        <pie-chart :data="graph_kolam"></pie-chart>
                        <br/>
                          <div class="col-sm-12">
                          <!-- Info -->
                              <h5 class="col-sm-12 font-weight-bold">{{jumlah_kolam}} Kolam</h5>
                          </div>
                      </div>
                    </div>
                   </div>
                 </div>

                 <div class="col-lg-4 col-sm-4">
                   <div class="col-sm-12">
                   <!-- Chart -->
                    <dl class="row">
                      <div class="col-sm">
                      <!-- small box -->
                       <div class="small-box bg-danger">
                         <div class="inner">
                          <h6 class="col-sm">Jumlah User</h6>
                          <h3 class="col-sm">{{jumlah_user}}</h3>
                         </div>
                       </div>
                      </div>
                    </dl>
                    <dl class="row">
                      <div class="col-sm">
                      <!-- small box -->
                       <div class="small-box bg-info">
                         <div class="inner">
                           <h6 class="col-sm">Jumlah Peneliti</h6>
                           <h3 class="col-sm">{{jumlah_peneliti}}</h3>
                         </div>
                       </div>
                      </div>
                    </dl>
                    <dl class="row">
                      <div class="col-sm">
                      <!-- small box -->
                       <div class="small-box bg-success">
                         <div class="inner">
                           <h6 class="col-sm">Jumlah Operator</h6>
                           <h3 class="col-sm">{{jumlah_operator}}</h3>
                         </div>
                       </div>
                      </div>
                    </dl>
                   </div>
                 </div>
                </div>
               </div>
               <!-- /.card-body-->
             </div>
             <!-- /.card -->
           </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
     </section>
   </div>
 </template>
 
 <script>
 import {getHeader, kolamUrl, mikroalgaUrl, usersUrl} from '../../config'
 import axios from 'axios'
 
 export default {
   data: function () {
    return {
      kolam: [],
      user: [],
      mikroalga: [],
      graph_user:[],
      graph_mikroalga:[],
      graph_kolam:[],
      jumlah_user: '',
      jumlah_operator: '',
      jumlah_peneliti: '',
      jumlah_mikroalga: '',
      jumlah_kolam: '',
      isHidden: true,
      rt :null
    }
  },
 
  // mounted() {
  //   this.geolocate();
  // },
 
  methods: {
    // chart
    getUser: function(){
      var app = this;
      axios.get(usersUrl, {headers: getHeader()})
      .then(function(response){
        app.user=response.data.data;
        app.jumlah_user=app.user.data.length;
        //console.log(app.user)
        var temp = []
        temp = response.data.data;
        var x = 0; var y = 0;
        for (let i = 0; i < temp.data.length; i++) {
          if(temp.data[i].id_role == 2){
            x++
          }
          if(temp.data[i].id_role == 3){
            y++
          }
        }
        app.jumlah_peneliti=x;
        app.jumlah_operator=y;
      })
    },

    getMikroalga: function(){
      var app = this;
      axios.get(mikroalgaUrl, {headers: getHeader()})
      .then(function(response){
        app.mikroalga=response.data.data;
        app.jumlah_mikroalga=app.mikroalga.data.length;
        //console.log(app.mikroalga)
        var temp = []
        temp = response.data.data;
        for (let i = 0; i < temp.data.length; i++) {
          var a = []; var x = 0;
          a.push(temp.data[i].nama_spesies)
          x++
          a.push(x)
          app.graph_mikroalga.push(a)
        }
      })
    },

    getKolam: function(){
      var app = this;
      axios.get(kolamUrl, {headers: getHeader()})
      .then(function(response){
        app.kolam=response.data.data;
        app.jumlah_kolam=app.kolam.data.length;
        //console.log(app.kolam)
        var temp = []
        temp = response.data.data;
        for (let i = 0; i < temp.data.length; i++) {
          var a = []; var x = 0;
          a.push(temp.data[i].nama_kolam)
          x++
          a.push(x)
          app.graph_kolam.push(a)
        }
      })
    },
  },
 
  created() {
    this.getKolam();
    this.getMikroalga();
    this.getUser();
  }
 }
 </script>
 