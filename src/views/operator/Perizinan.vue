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
                        <select class="form-control" @change="selectAksi">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option value="1100">Unduh Log Sensor</option>
                          <option value="1200">Melakukan Aksi Pada Kolam</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                    <div class="form-group">
                        <label>Pilih Kolam</label>
                        <select class="form-control" @change="getProduksi">
                          <option value="" disabled selected >Silakan Pilih</option>
                          <option v-for="kolam in kolam.data" :key="kolam.id" v-bind:value="kolam.id">{{kolam.nama_kolam}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                      <div class="form-group">
                        <label>Pilih Produksi</label>
                        <select class="form-control" @change="selectProd">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="prod in prod.data" :key="prod.id" v-bind:value="prod.id" >Produksi {{prod.id}}</option>
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
import {kolamUrl, produksiUrl, getHeader} from '../../config'
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
          app.kolam=response.data.data;
          //console.log(app.kolam)
        })
      },
      getProduksi: function(event){
        //console.log(this.selectedAksi)
        var app = this;
        var key = event.target.value
        var prodUrl = kolamUrl + '/' + key + '/produksi';
        axios.get(prodUrl, {headers: getHeader()})
        .then(function(response){
          app.prod=response.data.data;
          //app.isHidden=false;
          //console.log(app.prod)
        })
      },
      selectProd: function(event){
        this.selectedProd = event.target.value
      },
      selectAksi: function(event){
        this.selectedAksi = event.target.value
      },
      postLogaksi: function(){
        const postData ={
          id_aksi: this.selectedAksi
        }
      var izinUrl = produksiUrl + '/' + this.selectedProd + '/perizinan'
        axios.post(izinUrl, postData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
        this.perizinansukses();
      },
      perizinansukses: function() {
          this.$bvToast.toast('Permintaan Log aksi berhasil diajukan', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
        
      }
  },
  created(){
    this.getKolam();
  }
}
</script>