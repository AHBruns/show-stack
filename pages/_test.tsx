import React from "react";
import Head from "next/head";

export default () => (
    <div className="p-10">
        <Head>
            <title>jQuery UI Slider functionality</title>
            <link
                href="https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css"
                rel="stylesheet"
            />
            <script src="https://code.jquery.com/jquery-1.10.2.js" />
            <script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `$(function() {
            $( "#slider-3" ).slider({
               range:true,
               min: 0,
               max: 500,
               values: [ 35, 200 ],
               slide: function( event, ui ) {
                  $( "#price" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
               }
            });
            $( "#price" ).val( "$" + $( "#slider-3" ).slider( "values", 0 ) +
               " - $" + $( "#slider-3" ).slider( "values", 1 ) );
         });`,
                }}
            />
        </Head>
        <p>
            <label htmlFor="price">Price range:</label>
            <input
                type="text"
                id="price"
                style={{ border: 0, color: "#b9cd6d", fontWeight: "bold" }}
            />
        </p>
        <div id="slider-3" />
    </div>
);
