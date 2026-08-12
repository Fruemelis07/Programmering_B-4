<!DOCTYPE html>
<html>
  <head>
    <title>PHP Database (Musik)</title>
    <meta charset="UTF-8">
  </head>

  <body>
    <h1>Red Velvet sangovesigt</h1>

    <form action="PHP_databaseadgang.php" method="GET">
        <b>Red Velvet</b><br><br>
       <input type="text" name="Search" size="10">
        <input type="submit" value="Søg sang, album, genre, koncept..."/>
    </form>

<?php
$conn = new mysqli("localhost", "root", "redvelvet");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

<?php include "config.php"; ?>

<form method="GET">
    <input type="text" name="search" placeholder="Søg sang, album, genre, koncept...">
    <button type="submit">Søg</button>
</form>

<?php
$search = $_GET['search'] ?? "";

$sql = "
SELECT songs.song_id, songs.song_name, songs.track_type,
       albums.album_name, genres.genre_name, concept_types.concept_name
FROM songs
LEFT JOIN albums ON songs.album_id = albums.album_id
LEFT JOIN genres ON songs.genre_id = genres.genre_id
LEFT JOIN concept_types ON songs.concept_id = concept_types.concept_id
WHERE songs.song_name LIKE '%$search%'
   OR albums.album_name LIKE '%$search%'
   OR genres.genre_name LIKE '%$search%'
   OR concept_types.concept_name LIKE '%$search%'
";

$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    echo "<p>";
    echo "<strong>" . $row['song_name'] . "</strong> (" . $row['track_type'] . ")<br>";
    echo "Album: " . $row['album_name'] . "<br>";
    echo "Genre: " . $row['genre_name'] . "<br>";
    echo "Koncept: " . $row['concept_name'] . "<br>";
    echo "</p>";
}
?>

</body>
</html>

