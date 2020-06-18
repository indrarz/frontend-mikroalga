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
                      <i class="far fa-clipboard"></i>
                       Ajukan Perizinan
                    </h3>
    
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                        <label>Pilih Aksi</label>
                        <select class="form-control">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option @click="selectedAksi = 1101">Unduh Log Sensor</option>
                          <option @click="selectedAksi = 2501">Pemberian Nutrisi</option>
                          <option @click="selectedAksi = 2502">Pemanenan</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                    <div class="form-group">
                        <label>Pilih Kolam</label>
                        <select class="form-control">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="kolam in kolam.data" :key="kolam.id" @click="getProduksi(kolam.id)">{{kolam.nama_kolam}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                      <div class="form-group">
                        <label>Pilih Produksi</label>
                        <select class="form-control">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="prod in prod" :key="prod.id" @click="selectedProd = prod.id">Produksi {{prod.id}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                      <button type="button" class="btn btn-primary" @click="postLogaksi()">Submit</button>
                  </div>
                  <!-- /.card-body-->
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
import {kolamUrl, logaksiUrl, getHeader} from '../../config'
import axios from 'axios'
export default {
  data: function(){
    return{
      kolam: [],
      prod: [],
      selectedAksi: '',
      selectedProd: ''
    }
  },
  
  methods: {
    getKolam: function(){
        var app = this;
        axios.get(kolamUrl, {headers: getHeader()})
        .then(function(response){
          app.kolam=response.data;
          //console.log(app.kolam)
        })
      },
      getProduksi: function(key){
        console.log(this.selectedAksi)
        var app = this;
        var prodUrl = kolamUrl + '/' + key + '/produksi';
        axios.get(prodUrl, {headers: getHeader()})
        .then(function(response){
          app.prod=response.data.data;
          //app.isHidden=false;
          //console.log(app.prod)
        })
      },
      postLogaksi: function(){
        const postData ={
          id_aksi: this.selectedAksi,
          id_produksi: this.selectedProd
        }
        axios.post(logaksiUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      }
  },
  created(){
    this.getKolam();
  }
}
</script>