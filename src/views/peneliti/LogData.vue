<template>
      <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
            <div class="col-12">
                <!-- interactive chart -->
                <div class="card card-primary card-outline">
                  <div class="card-header">
                    <h3 class="card-title">
                      <i class="far fa-chart-bar"></i>
                      Data Sensor
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                        <label>Pilih Kolam</label>
                        <select class="form-control">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="kolam in kolam.data" :key="kolam.id" @click="getProduksi(kolam.id)">{{kolam.nama_kolam}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                      <div class="form-group" v-if="isHidden === false">
                        <label>Pilih Produksi</label>
                        <select class="form-control">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="prod in prod" :key="prod.id" @click="getLog(prod.id)">Produksi {{prod.id}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                      <button type="button" class="btn btn-primary" @click="downloadLog(link.link)" v-if="hideButton === false"><i class="fas fa-download"></i> Unduh Semua Log Data</button>
                              <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                      <th>Tanggal</th>
                                      <!--<th>Jam</th>-->
                                      <th>pH</th>
                                      <th>Kekeruhan Air</th>
                                      <th>Kecepatan Air</th>
                                      <th>Kecepatan Udara</th>
                                      <th>Suhu Air</th>
                                      <th>Energi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="data in data.data" :key="data.id">
                                      <td>{{data.created_at}}</td>
                                      <!--<td>00.00.00</td>-->
                                      <td>{{data.ph_air}}</td>
                                      <td>{{data.kekeruhan}}</td>
                                      <td>{{data.kecepatan_air}}</td>
                                      <td>{{data.aliran_udara}}</td>
                                      <td>{{data.suhu_air}}</td>
                                      <td>{{data.energi_listrik}}</td>
                                    </tr>
                                                                               
                                    </tbody>
                                  </table>
                  </div>
                  <!-- /.card-body-->
                  <div class="card-footer">
                    
                  </div>
                </div>
                <!-- /.card -->
    
              </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import {getHeader, produksiUrl, kolamUrl} from '../../config'
import axios from 'axios'
export default {

    data: function () {
        return {
          data: [],
          kolam: [],
          prod: [],
          link: '',
          isHidden: true,
          hideButton: true
        }
    },

    methods: {
      getKolam: function(){
        var app = this;
        axios.get(kolamUrl, {headers: getHeader()})
        .then(function(response){
          app.kolam=response.data.data;
          //console.log(app.kolam)
        })
      },
      getProduksi: function(key){
        var app = this;
        var prodUrl = kolamUrl + '/' + key + '/produksi';
        axios.get(prodUrl, {headers: getHeader()})
        .then(function(response){
          app.prod=response.data.data.data;
          app.isHidden=false;
          //console.log(app.prod)
        })
      },

      getLog: function(key) {

        var app = this;
        var logUrl = produksiUrl + '/' + key + '/output-sensor'
        var downloadUrl = logUrl + '/download'

         axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            app.hideButton = false;
            //console.log(app.data)
        })
        .catch(function (error) {
            console.log(error.message);
        });
        axios.get(downloadUrl, {headers: getHeader()})
            .then(function (response) {
            app.link = response.data;
            //console.log(app.link)
        })
        .catch(function (error) {
            console.log(error.message);
        });


      },
      downloadLog: function(key){
        window.location.assign(key)
      }

    },

    created() {
      this.getKolam();
      //this.getUsers();
    }

    }
</script>