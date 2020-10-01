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
                      Kondisi Saat Ini
                    </h3>
    
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                        <label>Pilih Kolam</label>
                        <select class="form-control" @change="getProduksi">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="kolam in kolam.data" :key="kolam.id" v-bind:value="kolam.id">{{kolam.nama_kolam}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                      <div class="form-group" v-if="isHidden === false">
                        <label>Pilih Produksi</label>
                        <select class="form-control" @change="getOutput">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="prod in prod" :key="prod.id" v-bind:value="prod.id">Produksi {{prod.id}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                    <ul class="nav nav-tabs" id="custom-content-below-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="custom-content-below-realtime-tab" data-toggle="pill" href="#realtime" role="tab" aria-controls="custom-content-below-realtime" aria-selected="true">Data Realtime</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="custom-content-below-grafik-tab" data-toggle="pill" href="#grafik" role="tab" aria-controls="custom-content-below-grafik" aria-selected="false">Grafik</a>
                      </li>
                    </ul>
                    <div class="tab-content" id="custom-content-below-tabContent">
                      <div class="tab-pane fade show active" id="realtime" role="tabpanel" aria-labelledby="custom-content-below-reatime-tab">
                        <div class="row">
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-info">
                          <div class="inner">
                            <h3>{{suhu_air}} °C</h3>
            
                            <p>Suhu</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-success">
                          <div class="inner">
                            <h3>{{ph_air}}</h3>
            
                            <p>pH</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-warning">
                          <div class="inner">
                            <h3>{{intensitas_cahaya}} lux</h3>
            
                            <p>Intensitas Cahaya</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-danger">
                          <div class="inner">
                            <h3>{{ketinggian_air}} cm</h3>
            
                            <p>Ketinggian Air</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                    </div>
                    <br/>
                    <dl class="row">
                        <dt class="col-sm-4">Kekeruhan</dt>
                        <dd class="col-sm-8">{{kekeruhan}} NTU</dd>
                        <dt class="col-sm-4">Kecepatan Air</dt>
                        <dd class="col-sm-8">{{kecepatan_air}} cm<sup>3</sup>/s</dd>
                        <dt class="col-sm-4">Kecepatan Udara</dt>
                        <dd class="col-sm-8">{{aliran_udara}} cm/s</dd>
                        <dt class="col-sm-4">Energi</dt>
                        <dd class="col-sm-8">{{energi_listrik}} kW/h</dd>
                    </dl>
                  </div>
                      <div class="tab-pane fade" id="grafik" role="tabpanel" aria-labelledby="custom-content-below-grafik-tab">
                      <line-chart :data="graphdata"></line-chart>
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
import {getHeader, produksiUrl, kolamUrl} from '../../config'
import axios from 'axios'
//import LineChart from '../../LineChart.js'
export default {
    data: function () {
        return {
          kolam: [],
          prod: [],
          suhu_air: '',
          ph_air: '',
          intensitas_cahaya: '',
          ketinggian_air: '',
          kekeruhan: '',
          kecepatan_air: '',
          aliran_udara: '',
          energi_listrik: '',
          graphdata:[],
          isHidden: true,
          rt :null
          //graphlabel:[]
          /*chartData: {
            '2017-05-13' : 2,
            '2017-05-14' : 5,
            '2017-05-15' : 4
          }*/
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
      getProduksi: function(event){
        var app = this;
        app.isHidden = true;
        var key = event.target.value;
        var prodUrl = kolamUrl + '/' + key + '/produksi';
        axios.get(prodUrl, {headers: getHeader()})
        .then(function(response){
          app.prod=response.data.data.data;
          app.isHidden=false;
          //console.log(app.prod)
        })
      },

      getOutput: function(event) {

        var app = this;
        window.clearInterval(this.rt)
        var key = event.target.value;
        const outputUrl = produksiUrl+'/'+ key +'/output-sensor/latest'
        app.getLog(key)
        app.rt = setInterval(() => {
          
          axios.get(outputUrl, {headers: getHeader()})
            .then(function (response) {
            app.suhu_air = response.data.data.suhu_air;
            app.ph_air = response.data.data.ph_air;
            app.intensitas_cahaya = response.data.data.intensitas_cahaya;
            app.ketinggian_air = response.data.data.ketinggian_air;
            app.kekeruhan = response.data.data.kekeruhan;
            app.kecepatan_air = response.data.data.kecepatan_air;
            app.aliran_udara = response.data.data.aliran_udara;
            app.energi_listrik = response.data.data.energi_listrik;
            if(response.data.data.suhu_air > 34){
              app.suhutinggi(); //34 adalah nilai suhu tinggi sementara, nanti ditanya ke pak ganjar berapa patokan suhu terlalu tinggi
            }
            if(response.data.data.kekeruhan > 50){
              app.panennotif(); //50 adalah ntu sementara, nanti tanya pak ganjar nilai pastinya
            }
            if(response.data.data.kecepatan_air <= 1){
              app.waternotif(); //nanti ditanya mending 1 apa 0
            }
            //console.log(app.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });
          
        }, 5000);

      },
      
      getLog: function(key) {
        var app = this;
        var logUrl = produksiUrl + '/'+key+'/output-sensor'
        //var downloadUrl = logUrl + '/download'
         axios.get(logUrl, {headers: getHeader()})
            .then(function (response) {
            var temp = []
            temp = response.data.data;
            for (let i = 0; i < temp.data.length; i++) {
              var x = [];
              x.push(temp.data[i].created_at)
              x.push(temp.data[i].suhu_air)
              app.graphdata.push(x)
            }
            //console.log(app.graphdata);
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      suhutinggi: function() {
          this.$bvToast.toast('Suhu Terlalu Tinggi', {
          title: 'Peringatan',
          variant: 'danger',
          solid: true
        })
        
      },
      panennotif: function() {
          this.$bvToast.toast('Produksi 1 siap untuk dipanen', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
        
      },
      waternotif: function() {
          this.$bvToast.toast('Paddlewheel sedang tidak berjalan', {
          title: 'Peringatan',
          variant: 'warning',
          solid: true
        })
        
      }

    },

    created() {
      this.getKolam();
      //this.getLog();
    }

    }
</script>