<?php

namespace App\Mail;

use App\Models\Sale;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReceiptSale extends Mailable
{
    use Queueable, SerializesModels;

    private $sale_id;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($sale_id)
    {
        //
        $this->sale_id = $sale_id;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $sale = Sale::with('product')->findOrFail($this->sale_id);
        return $this->subject('Gracias por tu compra en Comepasto')->view('mails.receipt', ['sale' => $sale]);
    }
}