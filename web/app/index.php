<?php

require('../../vendor/autoload.php');

define('UPLOAD_DIR', 'data/');

function getData($img = 'demo')
{
    $data = array();

    $data['title'] = "Funny Chat Generator";
    $data['description'] = "Create your funny chat screenshot for free.";
    $data['alt_description'] = "Generate WhatsApp like fake conversation online.";
    $data['hashtags'] = "FunnyChatGenerator";

    if (file_exists(UPLOAD_DIR . "{$img}.png")) {
        $data['image'] = UPLOAD_DIR . "{$img}.png";
    } else {
        $data['image'] = "img/funny-chat-generator-demo.png";
    }
    
    $data['screenshot'] = "https://{$_SERVER['HTTP_HOST']}".str_replace('index.php', '', $_SERVER['SCRIPT_NAME']) . $data['image'];
    $data['currentUrl'] = "https://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";

    $data['is_demo'] = $img === 'demo' ? 'true' : 'false';

    return $data;
}

$app = new Silex\Application();

// Register the Twig templating engine
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

$app->get('/', function () use ($app) {
    return $app['twig']->render('home.twig', getData());
});

$app->get('/{img}', function ($img) use ($app) {
    return $app['twig']->render('home.twig', getData($img));
});

$app->post('/upload', function () {

    $img = $_POST['img'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $uniqId = uniqid();
    $file = UPLOAD_DIR . $uniqId . '.png';
    $success = file_put_contents($file, $data);

    if ($success) {
        return json_encode(
                array(
                        'status' => 1,
                        'file' => $uniqId,
                        'image' => "https://{$_SERVER['HTTP_HOST']}".str_replace('upload', '', $_SERVER['REQUEST_URI']) . UPLOAD_DIR . $uniqId . '.png',
                        'page_url' => "https://{$_SERVER['HTTP_HOST']}".str_replace('upload', '', $_SERVER['REQUEST_URI']) . $uniqId
                )
        );
    } else {
        return json_encode(
                array(
                        'status' => 0,
                        'message'=> 'Unable to save the file.'
                )
        );
    }
});


$app->run();