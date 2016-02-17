# node-server
Node.jsのサーバーサンプル
  
理想的な設計を目指して、作成中  

目標とする設計  
・仕様変更に強い  
・DBが変更になっても、ロジック系には修正が入らない  
・httpが、Websocketとかになっても、ロジック系には修正が入らない  
・機能を追加するにあたって、ファイルを追加するだけで、できるのが望ましい。  
・シンプルである  
・できる限り、業務とソースコードを似せることができる。（ロジック系を独立できるように）  
  
参考  
http://terasolunaorg.github.io/guideline/5.0.1.RELEASE/ja/Overview/ApplicationLayering.html#id11  
  
現時点で、気になる点  
  
・expressによる設定を、controllerに書いているが分けるべきか？（repositoryは、分けてない？）  
・設定ファイルのenvフォルダは、libとかと同列なのか？lib配下か？  
・
