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
                    <div class="row">
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-info">
                          <div class="inner">
                            <h3 v-for="datas in datas.data" :key="datas.id">{{datas.suhu_air}}</h3>
            
                            <p>Suhu</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-success">
                          <div class="inner">
                            <!--<h3>{{data.pH_air}}</h3>-->
            
                            <p>pH</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-warning">
                          <div class="inner">
                            <!--<h3>{{data.intensitas_cahaya}}</h3>-->
            
                            <p>Intensitas Cahaya</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-danger">
                          <div class="inner">
                            <!--<h3>{{data.ketinggian_air}}</h3>-->
            
                            <p>Ketinggian Air</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                    </div>
                    <br/>
                    <!--<dl class="row">
                        <dt class="col-sm-4">Tanggal Panen Terakhir</dt>
                        <dd class="col-sm-8">29 Januari 2020</dd>
                        <dt class="col-sm-4">Kekeruhan</dt>
                        <dd class="col-sm-8">{{data.kekeruhan}}</dd>
                        <dt class="col-sm-4">Kecepatan Air</dt>
                        <dd class="col-sm-8">{{data.kecepatan_air}} cm<sup>3</sup>/s</dd>
                        <dt class="col-sm-4">Kecepatan Udara</dt>
                        <dd class="col-sm-8">{{data.aliran_udara}} cm/s</dd>
                        <dt class="col-sm-4">Energi</dt>
                        <dd class="col-sm-8">{{data.energi_listrik}} W</dd>
                    </dl>-->
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
import {getHeader, produksiUrl} from '../../config'
import axios from 'axios'
export default {

    data: function () {
        return {
          datas: []
        }
    },

    methods: {

      getOutput: function() {

        var app = this;
        const outputUrl = produksiUrl+'/1/output_sensor/latest'
         axios.get(outputUrl, {headers: getHeader()})
            .then(function (response) {
            app.datas = response.data;
            console.log(app.datas);
        })
        .catch(function (error) {
            console.log(error.message);
        });

      }

    },

    created() {
      this.getOutput();
    }

    }
</script>