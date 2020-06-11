<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Dashboard</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
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
                            <h3>27.71°C</h3>
            
                            <p>Suhu</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-success">
                          <div class="inner">
                            <h3>53 RH</h3>
            
                            <p>Kelembapan</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-warning">
                          <div class="inner">
                            <h3>984.54</h3>
            
                            <p>Tekanan</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                      <div class="col-lg-3 col-6">
                        <!-- small box -->
                        <div class="small-box bg-danger">
                          <div class="inner">
                            <h3>241.83</h3>
            
                            <p>Ketinggian</p>
                          </div>
                        </div>
                      </div>
                      <!-- ./col -->
                    </div>
                    <br/>
                    <dl class="row">
                        <dt class="col-sm-4">Tanggal Panen Terakhir</dt>
                        <dd class="col-sm-8">29 Januari 2020</dd>
                        <dt class="col-sm-4">pH</dt>
                        <dd class="col-sm-8">8.3</dd>
                        <dt class="col-sm-4">Kekeruhan</dt>
                        <dd class="col-sm-8">10 NTU</dd>
                        <dt class="col-sm-4">Kecepatan Air</dt>
                        <dd class="col-sm-8">30 cm<sup>3</sup>/s</dd>
                        <dt class="col-sm-4">Kecepatan Udara</dt>
                        <dd class="col-sm-8">40 cm/s</dd>
                        <dt class="col-sm-4">Energi</dt>
                        <dd class="col-sm-8">3.3 W</dd>
                    </dl>
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