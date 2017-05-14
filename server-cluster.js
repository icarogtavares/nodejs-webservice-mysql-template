import cluster  from 'cluster';
import os from 'os';
import app from './server';

var cpus = os.cpus();

if(cluster.isMaster){
  cpus.forEach(function(){
      cluster.fork();
  });

  cluster.on('listening', function(worker){
    console.log(`cluster connected ${worker.process.pid}`);
  });

  cluster.on('exit', worker => {
    console.log(`cluster ${worker.process.pid} disconnected`);
    cluster.fork();
  })

} else {
  app();
}
