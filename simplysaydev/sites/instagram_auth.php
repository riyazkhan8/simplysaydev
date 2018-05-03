
        <script type="text/javascript">
            //using php to look for the error parameter in the URL
            if(<?php echo intval(isset($_GET['error'])); ?>) {
                self.close();
            }
        </script>