<template>
      <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
          </div><!-- /.col -->
          <div class="col-sm-6">

          </div><!-- /.col -->
        </div><!-- /.row -->
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
                      <i class="far fas fa-tint"></i>
                      Data Kolam
                    </h3>
                  </div>
                  <div class="card-body">
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-add"><i class="fas fa-plus"></i> Tambahkan Kolam</button>

                              <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                      <th>Nama Kolam</th>
                                      <th>Status</th>
                                      <th>Aksi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(kolam, index) in kolam.data" :key="kolam.id">
                                      <td>{{kolam.nama_kolam}}</td>
                                      <td v-if="kolam.deleted_at === null">Aktif</td>
                                      <td v-else>Nonaktif</td>
                                      <td><button type="button" class="btn btn-block bg-gradient-success btn-sm" data-toggle="modal" data-target="#modal-edit" @click="getInfoKolam(kolam.id)">Edit</button>
                                      <button type="button" class="btn btn-block bg-gradient-danger btn-sm" v-if="row[index] === 0" @click="hapusKolam(kolam.id, index)">Hapus</button>
                                      <button type="button" class="btn btn-block bg-gradient-success btn-sm" v-else @click="restorekolam(kolam.id, index)">Pulihkan</button>
                                      </td>
                                    </tr>
                                    
                                                                                                          
                                    </tbody>
                                  </table>
                                  <div class="text-center mt-5">
                                     <b-button v-if="hidefirst==false" variant="light" @click="first()"><i class="fas fa-angle-double-left"></i></b-button>
                                     <b-button v-if="hidefirst==false" class="mr-3" variant="light" @click="prev()"><i class="fas fa-angle-left"></i></b-button>
                                     <span>{{current_page}}</span>
                                     <b-button v-if="hidelast==false" class="ml-3" variant="light" @click="next()"><i class="fas fa-angle-right"></i></b-button>
                                     <b-button v-if="hidelast==false" variant="light" @click="last()"><i class="fas fa-angle-double-right"></i></b-button>
                                   </div>
                  </div>
                  <!-- /.card-body-->
                </div>
                <!-- /.card -->
    
              </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
      <!--Edit Kolam Modal-->
    <div class="modal fade" id="modal-edit">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Informasi Kolam</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="PUT">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Nama Kolam</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="edit.nama_kolam">
                      </div>
                  </div>
                  <input type="hidden" v-model="edit.id">
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="editKolam()" data-dismiss="modal">Simpan</button>
            </div>
            </form>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
        <!--Add Kolam Modal-->
      <div class="modal fade" id="modal-add">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Tambahkan Kolam Baru</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="PUT">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Nama Kolam</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="add.nama_kolam">
                      </div>
                  </div>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="addKolam()" data-dismiss="modal">Simpan</button>
            </div>
            </form>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
    </section>

    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
import {getHeader, kolamUrl} from '../../config'
import axios from 'axios'
export default {

    data: function () {
        return {
          kolam: [],
          edit: [],
          row: [],
          add:{
            nama_kolam: ''
          },
          current_page: '',
          last_page: '',
          hidefirst: true,
          hidelast: true
        }
    },

    methods: {
       next: function(){
        var app = this
        var nextUrl = app.data.next_page_url
        app.data = []
        axios.get(nextUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            if(app.current_page == app.data.last_page){
              app.hidelast = true
            }
            else{
              app.hidefirst = false
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      last: function(){
        var app = this
        var lastUrl = app.data.last_page_url
        app.data = []
        axios.get(lastUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hidelast = true
            app.hidefirst = false
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      prev: function(){
        var app = this
        var prevUrl = app.data.prev_page_url
        app.data = []
        axios.get(prevUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            if(app.current_page == 1){
              app.hidefirst = true
            }
            else{
              app.hidelast = false
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      first: function(){
        var app = this
        var firstUrl = app.data.first_page_url
        app.data = []
        axios.get(firstUrl, {headers: getHeader()})
            .then(function (response) {
            app.prod = response.data.data;
            //console.log(app.data.next_page_url)
            app.last_page = app.data.last_page
            app.current_page = app.data.current_page
            app.hidefirst = true
            app.hidelast = false
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      getKolam: function(){ 
        var app = this;
        axios.get(kolamUrl, {headers: getHeader()})
        .then(function(response){
          app.kolam=response.data.data;
          app.current_page = response.data.data.current_page
            app.last_page = response.data.data.last_page
            if(app.current_page != app.last_page){ 
              app.hidelast = false
              }
          for (let index = 0; index < app.kolam.data.length; index++) {
            if(app.kolam.data[index].deleted_at == null){
            app.row.push(0)
            }
            else{
              app.row.push(1)
            }
          }
          //console.log(app.kolam);
        })
      },
      getInfoKolam: function(key){
         var app = this;
          var infoUrl = kolamUrl + '/' + key
        axios.get(infoUrl, {headers: getHeader()})
            .then(function (response) {
            app.edit = response.data.data;
            //console.log(app.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      editKolam: function(){
        const editData = {
              nama_kolam: this.edit.nama_kolam,
          }
          var editUrl = kolamUrl + '/' + this.edit.id
          axios.put(editUrl, editData, {headers: getHeader()})
          this.editsukses();
      },
      restorekolam: function(key, x){
        //window.console.log('id delete' + key)
        const resUrl = kolamUrl + '/' + key + '/restore';
        axios.put(resUrl, key, {headers: getHeader()});
        this.restoresukses();
        this.row.splice(x, 1, 0)
      },
      addKolam: function(){
        const addData = {
              nama_kolam: this.add.nama_kolam,
          }
          axios.post(kolamUrl, addData, {headers: getHeader()})
          
          this.addsukses();
      },
      hapusKolam: function(key, x){
        var delUrl = kolamUrl + '/' + key;
        axios.delete(delUrl, {headers: getHeader()})
        this.delsukses();
        this.row.splice(x,1,1)
      },
      addsukses: function() {
          this.$bvToast.toast('Kolam Berhasil Ditambahkan', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
        
      },
      editsukses: function() {
        this.$bvToast.toast('Informasi Kolam Berhasil Diubah', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
      },
      restoresukses: function() {
        this.$bvToast.toast('Informasi Kolam Berhasil Dipulihkan', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
      },
      delsukses: function(){
        this.$bvToast.toast('Informasi Kolam Berhasil Dihapus', {
          title: 'Notifikasi',
          variant: 'danger',
          solid: true
      })
      }
    },
    created(){
      this.getKolam();
    }

    }
</script>

<style>
/*@import "../../assets/plugins/fontawesome-free/css/all.min.css";
  @import "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css";
  @import "../../assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
  @import ".././assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
  @import "../../assets/plugins/jqvmap/jqvmap.min.css";
  @import "../../assets/dist/css/adminlte.min.css";
  @import "../../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
  @import "../../assets/plugins/daterangepicker/daterangepicker.css";
  
  @import "../../assets/plugins/summernote/summernote-bs4.css";
  @import "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700";
  @import "../../assets/plugins/bootstrap/js/bootstrap.bundle.min.js";
  @import "../../assets/plugins/chart.js/Chart.min.js";
  @import "../../assets/plugins/sparklines/sparkline.js";
  @import "../../assets/plugins/jqvmap/jquery.vmap.min.js";
  @import "../../assets/plugins/jqvmap/maps/jquery.vmap.usa.js";
  @import "../../assets/plugins/jquery-knob/jquery.knob.min.js";
  @import "../../assets/plugins/moment/moment.min.js";
  @import "../../assets/plugins/daterangepicker/daterangepicker.js";
  @import "../../assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js";
  @import "../../assets/plugins/summernote/summernote-bs4.min.js";
  @import "../../assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";
  @import "../../assets/dist/js/adminlte.js";
  @import "../../assets/dist/js/pages/dashboard.js";
  @import "../../assets/dist/js/demo.js";*/
</style>